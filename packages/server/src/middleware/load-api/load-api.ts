import type { APIInstance } from '@cretadoc/api';
import type { RequestHandler } from 'express';

// We need to be explicit to avoid TS2742 error.
type LoadAPI = (instance: APIInstance) => RequestHandler;

export const loadAPI: LoadAPI =
  (instance: APIInstance): RequestHandler =>
  (req, res, next) => {
    instance(req, res).catch(next);
  };
