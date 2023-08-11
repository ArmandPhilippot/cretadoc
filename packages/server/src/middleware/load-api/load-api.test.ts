import { createAPI } from '@cretadoc/api';
import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import express, { type Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { loadAPI } from './load-api';

type LoadAPIContext = {
  app: Express;
};

describe('load-api', () => {
  beforeEach<LoadAPIContext>((ctx) => {
    ctx.app = express();
  });

  it<LoadAPIContext>('can serve the given instance', async ({ app }) => {
    const api = await createAPI();
    app.use(api.graphqlEndpoint, loadAPI(api));

    const response = await request(app).get(api.graphqlEndpoint);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
  });
});
