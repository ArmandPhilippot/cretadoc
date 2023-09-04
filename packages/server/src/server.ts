import type { Server } from 'http';
import type { Maybe, PartialDeep } from '@cretadoc/utils';
import express, { type Express } from 'express';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import {
  errorHandler,
  loadAPI,
  loadCommonMiddleware,
  loadStaticDir,
  renderContents,
} from './middleware';
import type { CretadocServer, HMRConfig, ServerConfig } from './types';
import { ENVIRONMENT } from './utils/constants';
import { mergeDefaultConfigWith } from './utils/helpers';

/**
 * Create a Vite server in middleware mode.
 *
 * @param {HMRConfig} [hmr] - The HMR configuration.
 * @returns {Promise<ViteDevServer>} The Vite server.
 */
const createDevServer = async (hmr?: HMRConfig): Promise<ViteDevServer> =>
  createViteServer({
    appType: 'custom',
    server: { hmr, middlewareMode: true },
  });

type ExpressAppConfig = Pick<ServerConfig, 'mode'> &
  Maybe<Pick<ServerConfig, 'api' | 'hmr' | 'ssr' | 'staticDir'>>;

/**
 * Create an Express application.
 *
 * @param {ExpressAppConfig} config - The configuration.
 * @returns {Express} The express app.
 */
const createExpressApp = async ({
  api,
  hmr,
  mode,
  ssr,
  staticDir,
}: ExpressAppConfig): Promise<Express> => {
  const app = express();
  app.disable('x-powered-by');

  const viteServer =
    mode === ENVIRONMENT.DEVELOPMENT ? await createDevServer(hmr) : undefined;

  app.use(loadCommonMiddleware(mode));
  // cSpell:ignore-word middlewares
  if (api) app.use(api.graphqlEndpoint, loadAPI(api));
  if (viteServer) app.use(viteServer.middlewares);
  if (staticDir) app.use(staticDir.route, loadStaticDir(staticDir));
  if (ssr) app.use(ssr.route, renderContents(ssr, viteServer));
  app.use(errorHandler);

  return app;
};

// Without this additional type, the config type becomes `any` on build.
type CreateServer = (
  config?: PartialDeep<ServerConfig>
) => Promise<CretadocServer>;

/**
 * Create a new server.
 *
 * @param {PartialDeep<ServerConfig>} [config] - The server configuration.
 * @returns {Promise<CretadocServer>} The methods to start/stop the server.
 */
export const createServer: CreateServer = async (
  config?: PartialDeep<ServerConfig>
): Promise<CretadocServer> => {
  const mergedConfig = mergeDefaultConfigWith(config);
  const { hostname, port, ...appConfig } = mergedConfig;
  const app = await createExpressApp(appConfig);
  let server: Maybe<Server> = undefined;

  const start = () => {
    server = app.listen(port, () => {
      console.log(`[server]: Server is running at http://${hostname}:${port}`);
    });
  };

  const stop = () => {
    server?.close((error) => {
      if (error) console.error(error);
      else console.log('[server]: Server is stopped.');
    });
  };

  return {
    config: mergedConfig,
    start,
    stop,
  };
};
