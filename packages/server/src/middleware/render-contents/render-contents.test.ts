import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import express, { type Express } from 'express';
import request from 'supertest';
import { type InlineConfig, createServer } from 'vite';
import { beforeEach, describe, expect, it } from 'vitest';
import { body, state } from '../../../tests/fixtures/ssr/data';
import type { SSRConfig } from '../../types';
import { renderContents } from './render-contents';

type RenderContentsContext = {
  app: Express;
  ssrConfig: SSRConfig;
  viteConfig: InlineConfig;
};

describe('render-contents', () => {
  beforeEach<RenderContentsContext>((ctx) => {
    ctx.app = express();

    ctx.ssrConfig = {
      entrypoint: new URL(
        '../../../tests/fixtures/ssr/entry-server.ts',
        import.meta.url
      ).pathname,
      route: '/',
    };

    ctx.viteConfig = {
      appType: 'custom',
      server: { middlewareMode: true },
    };
  });

  it<RenderContentsContext>('renders the contents in production mode', async ({
    app,
    ssrConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;

    app.use(route, renderContents(ssr));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain(body);
    expect(response.text).toContain(JSON.stringify(state));

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it<RenderContentsContext>('renders the contents with vite server in dev mode', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);

    app.use(route, renderContents(ssr, viteServer));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain(body);
    expect(response.text).toContain(JSON.stringify(state));

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it<RenderContentsContext>('returns an error if a render function is not exported', async ({
    app,
    ssrConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const config: Omit<SSRConfig, 'route'> = {
      ...ssr,
      entrypoint: new URL(
        '../../../tests/fixtures/ssr/invalid-entry-server.ts',
        import.meta.url
      ).pathname,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    expect(response.text).toMatch(
      'The server entrypoint must export a render function.'
    );
    expect.assertions(2);
  });
});
