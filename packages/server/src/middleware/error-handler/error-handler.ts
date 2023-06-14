/* eslint-disable max-params */
import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import type { ErrorRequestHandler } from 'express';

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
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send(`${err.name}: ${err.message}`);
  } else next(err);
};
