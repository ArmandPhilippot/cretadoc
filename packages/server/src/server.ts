import type { Server } from 'http';
import type { Maybe, PartialDeep } from '@cretadoc/utils';
import express, { type Express } from 'express';
import { loadDevMiddleware, loadProdMiddleware } from './middleware';
import type { ServerConfig, ServerMode, ServerReturn } from './types';
import { mergeDefaultConfigWith } from './utils/config';
import { ENVIRONMENT } from './utils/constants';

/**
 * Create an Express application.
 *
 * @param {ServerMode} mode - The server mode.
 * @returns {Express} The express app.
 */
const createExpressApp = (mode: ServerMode): Express => {
  const app = express();
  app.disable('x-powered-by');

  if (mode === ENVIRONMENT.PRODUCTION) loadProdMiddleware(app);
  else loadDevMiddleware(app);

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
  const { hostname, mode, port } = mergedConfig;
  const app = createExpressApp(mode);
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
