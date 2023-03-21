import type { Server } from 'http';
import type { Maybe, PartialDeep } from '@cretadoc/utils';
import express, { type Express } from 'express';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { serveAPI } from './api';
import { loadDevMiddleware, loadProdMiddleware } from './middleware';
import { renderWithSSR } from './ssr';
import { serveStaticDir } from './static-dir';
import type { HMRConfig, ServerConfig, ServerReturn } from './types';
import { mergeDefaultConfigWith } from './utils/config';
import { ENVIRONMENT } from './utils/constants';

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

  const viteServer = await createDevServer(hmr);

  if (mode === ENVIRONMENT.PRODUCTION) loadProdMiddleware(app);
  else loadDevMiddleware(app, viteServer);

  if (api) serveAPI(app, api);
  if (ssr) renderWithSSR(app, viteServer, ssr);
  if (staticDir) serveStaticDir(app, staticDir);

  return app;
};

/**
 * Create a new server.
 *
 * @param {PartialDeep<ServerConfig>} [config] - The server configuration.
 * @returns {Promise<ServerReturn>} The methods to start/stop the server.
 */
export const createServer = async (
  config?: PartialDeep<ServerConfig>
): Promise<ServerReturn> => {
  const mergedConfig = mergeDefaultConfigWith(config);
  const { api, hostname, hmr, mode, port, ssr, staticDir } = mergedConfig;
  const app = await createExpressApp({ api, hmr, mode, ssr, staticDir });
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
