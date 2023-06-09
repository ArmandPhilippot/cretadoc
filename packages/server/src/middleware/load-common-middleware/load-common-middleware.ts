import cors from 'cors';
import type { RequestHandler } from 'express';
import helmet from 'helmet';
import type { ServerMode } from '../../types';

export const loadCommonMiddleware =
  (mode: ServerMode): RequestHandler =>
  (_req, _res, next) => {
    try {
      if (mode === 'production') {
        cors({ origin: false });
        helmet();
      } else cors({ origin: '*' });

      next();
    } catch (error) {
      next(error);
    }
  };
