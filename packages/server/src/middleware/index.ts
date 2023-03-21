import cors from 'cors';
import type { Express } from 'express';
import helmet from 'helmet';
import type { ViteDevServer } from 'vite';

/**
 * Load dev specific middleware.
 *
 * @param {Express} app - An express application.
 */
export const loadDevMiddleware = (app: Express, viteServer: ViteDevServer) => {
  app.use(cors({ origin: '*' }));
  app.use(viteServer.middlewares); // cSpell:ignore-word middlewares
};

/**
 * Load prod specific middleware.
 *
 * @param {Express} app - An express application.
 */
export const loadProdMiddleware = (app: Express) => {
  app.use(cors({ origin: false }));
  app.use(helmet());
};
