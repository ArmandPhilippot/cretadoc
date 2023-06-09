import { createAPI } from '@cretadoc/api';
import express, { type Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { HTTP_CODE } from '../../utils/constants';
import { loadAPI } from './load-api';

type LoadAPIContext = {
  app: Express;
};

describe('load-api', () => {
  beforeEach<LoadAPIContext>((ctx) => {
    ctx.app = express();
  });

  it<LoadAPIContext>('can serve the given instance', async ({ app }) => {
    const endpoint = '/api';
    const api = createAPI({ endpoint });
    app.use(endpoint, loadAPI(api));

    const response = await request(app).get(endpoint);

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
  });
});
