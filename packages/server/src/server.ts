import type { Server } from 'http';
import { join } from 'path';
import type { Maybe, PartialDeep } from '@cretadoc/utils';
import express, { type Express } from 'express';
import { loadDevMiddleware, loadProdMiddleware } from './middleware';
import type {
  APIConfig,
  ServerConfig,
  ServerMode,
  ServerReturn,
  StaticDirConfig,
} from './types';
import { mergeDefaultConfigWith } from './utils/config';
import { ENVIRONMENT } from './utils/constants';

/**
 * Serve the API.
 *
 * @param {Express} app - An Express application.
 * @param {APIConfig} config - The API config.
 */
const serveAPI = (app: Express, { instance, route }: APIConfig) => {
  app.use(route, (req, res) => {
    void (async () => {
      await instance(req, res);
    })();
  });
};

/**
 * Serve a static directory.
 *
 * @param {Express} app - An Express application.
 * @param {StaticDirConfig} config - The static directory config.
 */
const serveStaticDir = (
  app: Express,
  { entrypoint, path, route }: StaticDirConfig
) => {
  const absoluteEntrypoint = entrypoint.startsWith(path)
    ? entrypoint
    : join(path, entrypoint);

  app.use(express['static'](path, { index: false }));
  app.get(route, (_req, res) => {
    res.sendFile(absoluteEntrypoint);
  });
};

/**
 * Create an Express application.
 *
 * @param {ServerMode} mode - The server mode.
 * @param {APIConfig} [api] - The API config.
 * @param {StaticDirConfig} [staticDir] - The static directory config.
 * @returns {Express} The express app.
 */
const createExpressApp = (
  mode: ServerMode,
  api?: APIConfig,
  staticDir?: StaticDirConfig
): Express => {
  const app = express();
  app.disable('x-powered-by');

  if (mode === ENVIRONMENT.PRODUCTION) loadProdMiddleware(app);
  else loadDevMiddleware(app);

  if (api) serveAPI(app, api);
  if (staticDir) serveStaticDir(app, staticDir);

  return app;
};

/**
 * Create a new server.
 *
 * @param {PartialDeep<ServerConfig>} [config] - The server configuration.
 * @returns {ServerReturn} The config and methods to start/stop the server.
 */
export const createServer = (
  config?: PartialDeep<ServerConfig>
): ServerReturn => {
  const mergedConfig = mergeDefaultConfigWith(config);
  const { api, hostname, mode, port, staticDir } = mergedConfig;
  const app = createExpressApp(mode, api, staticDir);
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
