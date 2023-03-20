import cors from 'cors';
import type { Express } from 'express';
import helmet from 'helmet';

/**
 * Load dev specific middleware.
 *
 * @param {Express} app - An express application.
 */
export const loadDevMiddleware = (app: Express) => {
  app.use(cors({ origin: '*' }));
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
