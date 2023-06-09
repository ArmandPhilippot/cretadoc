import express, { type Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_ENTRYPOINT_FILE, HTTP_CODE } from '../../utils/constants';
import { loadStaticDir } from './load-static-dir';

type LoadStaticDirContext = {
  app: Express;
};

describe('load-static-dir', () => {
  beforeEach<LoadStaticDirContext>((ctx) => {
    ctx.app = express();
  });

  it<LoadStaticDirContext>('can serve a static directory', async ({ app }) => {
    const path = new URL('../../../tests/fixtures/static-dir/', import.meta.url)
      .pathname;
    app.get('/', loadStaticDir({ entrypoint: DEFAULT_ENTRYPOINT_FILE, path }));

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
    expect(response.text).toMatch('Hello from Cretadoc default entrypoint!');
  });
});
