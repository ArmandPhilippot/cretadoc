import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import cors, { type CorsOptions } from 'cors';
import express, { type RequestHandler, type Express } from 'express';
import helmet from 'helmet';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadCommonMiddleware } from './load-common-middleware';

vi.mock('cors', () => {
  return {
    default: vi.fn().mockImplementation(
      (_options: CorsOptions): RequestHandler =>
        (_req, _res, next) => {
          next();
        }
    ),
  };
});

vi.mock('helmet', () => {
  return {
    default: vi.fn().mockImplementation(
      (): RequestHandler => (_req, _res, next) => {
        next();
      }
    ),
  };
});

type LoadCommonMiddlewareContext = {
  app: Express;
  endpoint: string;
};

describe('load-common-middleware', () => {
  beforeEach<LoadCommonMiddlewareContext>((ctx) => {
    ctx.app = express();
    ctx.endpoint = '/any-path';
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it<LoadCommonMiddlewareContext>('can load production middleware', async ({
    app,
    endpoint,
  }) => {
    app.use(loadCommonMiddleware('production'));
    app.get(endpoint, (_req, res) => {
      res.status(HTTP_STATUS_CODE.OK).send('Some contents.');
    });

    const response = await request(app).get(endpoint);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(cors).toHaveBeenCalledWith({ origin: false });
    expect(helmet).toHaveBeenCalledOnce();
  });

  it<LoadCommonMiddlewareContext>('can load dev middleware', async ({
    app,
    endpoint,
  }) => {
    app.use(loadCommonMiddleware('development'));
    app.get(endpoint, (_req, res) => {
      res.status(HTTP_STATUS_CODE.OK).send('Some contents.');
    });

    const response = await request(app).get(endpoint);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(cors).toHaveBeenCalledWith({ origin: '*' });
    expect(helmet).not.toHaveBeenCalled();
  });
});
