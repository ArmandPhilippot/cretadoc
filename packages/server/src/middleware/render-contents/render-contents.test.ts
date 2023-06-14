import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import express, { type Request as ExpressRequest, type Express } from 'express';
import request from 'supertest';
import { type InlineConfig, createServer } from 'vite';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from '../../../tests/fixtures/ssr/entry-server';
import { render as renderWithoutState } from '../../../tests/fixtures/ssr/entry-server-html-only';
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
      placeholders: {
        content: '<!-- ssr-outlet -->',
        initialState: undefined,
        preloadedLinks: undefined,
      },
      route: '/',
      template: new URL(
        '../../../tests/fixtures/ssr/index.html',
        import.meta.url
      ).pathname,
    };

    ctx.viteConfig = {
      appType: 'custom',
      server: { middlewareMode: true },
    };
  });

  it<RenderContentsContext>('renders the HTML in production mode', async ({
    app,
    ssrConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;

    app.use(route, renderContents(ssr));

    const response = await request(app).get(route);
    const req = {} as ExpressRequest;
    const { html } = await render('', req);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain(html);
    expect.assertions(2);
  });

  it<RenderContentsContext>('renders the HTML with vite server in dev mode', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);

    app.use(route, renderContents(ssr, viteServer));

    const response = await request(app).get(route);
    const req = {} as ExpressRequest;
    const { html } = await render('', req);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain(html);
    expect.assertions(2);
  });

  it<RenderContentsContext>('renders the initial state', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);
    const config: Omit<SSRConfig, 'route'> = {
      ...ssr,
      placeholders: {
        ...ssr.placeholders,
        initialState: '<!-- ssr-initial-state -->',
      },
    };

    app.use('/', renderContents(config, viteServer));

    const response = await request(app).get('/');
    const req = {} as ExpressRequest;
    const { initialState } = await render('', req);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain(
      `\n<script>window.__INITIAL_STATE__='${JSON.stringify(
        initialState
      )}'</script>`
    );
    expect.assertions(2);
  });

  it<RenderContentsContext>('does not render the initial state if not provided', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);
    const config: Omit<SSRConfig, 'route'> = {
      ...ssr,
      entrypoint: new URL(
        '../../../tests/fixtures/ssr/entry-server-html-only.ts',
        import.meta.url
      ).pathname,
      placeholders: {
        ...ssr.placeholders,
        initialState: '<!-- ssr-initial-state -->',
      },
    };

    app.use(route, renderContents(config, viteServer));

    const response = await request(app).get(route);
    const { initialState } = await renderWithoutState('', {} as ExpressRequest);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).not.toContain(
      `\n<script>window.__INITIAL_STATE__='${JSON.stringify(
        initialState
      )}'</script>`
    );
    expect(response.text).not.toContain(config.placeholders.initialState);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });

  it<RenderContentsContext>('renders the preloaded links in document head', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);
    const config: Omit<SSRConfig, 'route'> = {
      ...ssr,
      placeholders: {
        ...ssr.placeholders,
        preloadedLinks: '<!-- ssr-preload-links -->',
      },
    };

    app.use(route, renderContents(config, viteServer));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).toContain('rel="preload"');
    expect.assertions(2);
  });

  it<RenderContentsContext>('does not render the preloaded links if not provided', async ({
    app,
    ssrConfig,
    viteConfig,
  }) => {
    const { route, ...ssr } = ssrConfig;
    const viteServer = await createServer(viteConfig);
    const config: Omit<SSRConfig, 'route'> = {
      ...ssr,
      entrypoint: new URL(
        '../../../tests/fixtures/ssr/entry-server-html-only.ts',
        import.meta.url
      ).pathname,
      placeholders: {
        ...ssr.placeholders,
        preloadedLinks: '<!-- ssr-preload-links -->',
      },
    };

    app.use(route, renderContents(config, viteServer));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_STATUS_CODE.OK);
    expect(response.text).not.toContain('rel="preload"');
    expect(response.text).not.toContain(config.placeholders.preloadedLinks);
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
