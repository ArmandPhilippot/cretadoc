import express, { type Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HTTP_CODE } from '../../utils/constants';
import { errorHandler } from './error-handler';

type ErrorHandlerContext = {
  app: Express;
};

describe('error-handler', () => {
  beforeEach<ErrorHandlerContext>((ctx) => {
    ctx.app = express();
  });

  it<ErrorHandlerContext>('should log error stack and return a 500 code', async ({
    app,
  }) => {
    const consoleSpy = vi.spyOn(console, 'error');
    const endpoint = '/any-path';
    const message = 'Any error.';
    app.get(endpoint, () => {
      throw new Error(message);
    });
    app.use(errorHandler);
    const response = await request(app).get(endpoint);

    expect(response.status).toBe(HTTP_CODE.ERROR);
    expect(response.text).toContain(message);
    expect(consoleSpy).toHaveBeenCalledOnce();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });
});
