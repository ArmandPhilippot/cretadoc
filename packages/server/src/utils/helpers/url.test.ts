import type { Request as ExpressRequest } from 'express';
import { describe, expect, it } from 'vitest';
import { SERVER_ERROR_CODE } from '../constants';
import { CretadocServerError } from '../exceptions';
import { getUrlFrom } from './url';

describe('get-url-from', () => {
  it('returns the url', () => {
    const protocol = 'http';
    const host = 'localhost';
    const originalUrl = '/endpoint';
    const req = {
      get: (_str: string) => host,
      originalUrl,
      protocol,
    } as ExpressRequest;

    expect(getUrlFrom(req)).toBe(`${protocol}://${host}${originalUrl}`);
  });

  it('returns the url from req.url if originalUrl missing', () => {
    const protocol = 'http';
    const host = 'localhost';
    const originalUrl = '';
    const url = '/endpoint';
    const req = {
      get: (_str: string) => host,
      originalUrl,
      protocol,
      url,
    } as ExpressRequest;

    expect(getUrlFrom(req)).toBe(`${protocol}://${host}${url}`);
  });

  it('throws an error if host cannot be read', () => {
    const protocol = 'http';
    const originalUrl = '/endpoint';
    const req = {
      get: (_str: string) => undefined,
      originalUrl,
      protocol,
    } as ExpressRequest;

    expect(() => getUrlFrom(req)).toThrow(
      new CretadocServerError(
        SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR,
        'Invalid request: cannot read host.'
      )
    );
  });
});
