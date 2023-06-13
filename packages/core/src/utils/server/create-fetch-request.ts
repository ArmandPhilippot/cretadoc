import type { IncomingHttpHeaders } from 'http';
import type { Request as ExpressRequest } from 'express';

/**
 * Retrieve an Headers object from the request.
 *
 * @param {IncomingHttpHeaders} requestHeaders - A req/res headers object.
 * @returns {Headers} The Headers object.
 */
const getHeadersFrom = (requestHeaders: IncomingHttpHeaders): Headers => {
  const headers = new Headers();

  for (const [key, values] of Object.entries(requestHeaders)) {
    if (!values) continue;

    if (Array.isArray(values))
      for (const value of values) headers.append(key, value);
    else headers.set(key, values);
  }

  return headers;
};

/**
 * Convert the Express request into a Fetch request.
 *
 * @param {ExpressRequest} req - The server request.
 * @param {string} url - The requested url.
 * @returns {Request} The Fetch request.
 */
export const createFetchRequest = (
  req: ExpressRequest,
  url: string
): Request => {
  const controller = new AbortController();

  req.on('close', () => controller.abort());

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? JSON.stringify(req.body)
      : undefined;
  const headers = getHeadersFrom(req.headers);
  const init: RequestInit = {
    body,
    headers,
    method: req.method,
    signal: controller.signal,
  };

  return new Request(url, init);
};
