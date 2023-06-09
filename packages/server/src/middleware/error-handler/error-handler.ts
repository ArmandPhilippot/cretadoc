/* eslint-disable max-params */
import type { ErrorRequestHandler } from 'express';
import { HTTP_CODE } from '../../utils/constants';

/**
 * Error handler middleware.
 *
 * @param err - The error.
 * @param _req - The Express request.
 * @param res - The Express response.
 * @param next - The Express next function.
 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(HTTP_CODE.ERROR).send(`${err.name}: ${err.message}`);
  } else next(err);
};
