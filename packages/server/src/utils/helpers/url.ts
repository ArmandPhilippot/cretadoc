import type { Request as ExpressRequest } from 'express';
import { SERVER_ERROR_CODE } from '../constants';
import { CretadocServerError } from '../exceptions';

/**
 * Retrieve the url from the server request.
 *
 * @param {ExpressRequest} req - The server request.
 * @returns {string} The requested url.
 */
export const getUrlFrom = (req: ExpressRequest): string => {
  const host = req.get('host');

  if (!host)
    throw new CretadocServerError(
      SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR,
      'Invalid request: cannot read host.'
    );

  const origin = `${req.protocol}://${host}`;

  return new URL(req.originalUrl || req.url, origin).href;
};
