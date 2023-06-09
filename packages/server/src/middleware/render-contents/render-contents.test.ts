import express, { type Express } from 'express';
import request from 'supertest';
import { type InlineConfig, createServer } from 'vite';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from '../../../tests/fixtures/ssr/entry-server';
import { render as renderWithoutState } from '../../../tests/fixtures/ssr/entry-server-html-only';
import type { SSRConfig } from '../../types';
import { HTTP_CODE } from '../../utils/constants';
import { type RenderContentsConfig, renderContents } from './render-contents';

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
    const config: RenderContentsConfig<'production'> = {
      mode: 'production',
      ssr,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);
    const { html } = await render('');

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
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
    const config: RenderContentsConfig<'development'> = {
      mode: 'development',
      ssr,
      viteServer,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);
    const { html } = await render('');

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
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
    const config: RenderContentsConfig<'development'> = {
      mode: 'development',
      ssr: {
        ...ssr,
        placeholders: {
          ...ssr.placeholders,
          initialState: '<!-- ssr-initial-state -->',
        },
      },
      viteServer,
    };

    app.use('/', renderContents(config));

    const response = await request(app).get('/');
    const { initialState } = await render('');

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
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
    const config: RenderContentsConfig<'development'> = {
      mode: 'development',
      ssr: {
        ...ssr,
        entrypoint: new URL(
          '../../../tests/fixtures/ssr/entry-server-html-only.ts',
          import.meta.url
        ).pathname,
        placeholders: {
          ...ssr.placeholders,
          initialState: '<!-- ssr-initial-state -->',
        },
      },
      viteServer,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);
    const { initialState } = await renderWithoutState('');

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
    expect(response.text).not.toContain(
      `\n<script>window.__INITIAL_STATE__='${JSON.stringify(
        initialState
      )}'</script>`
    );
    expect(response.text).not.toContain(config.ssr.placeholders.initialState);
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
    const config: RenderContentsConfig<'development'> = {
      mode: 'development',
      ssr: {
        ...ssr,
        placeholders: {
          ...ssr.placeholders,
          preloadedLinks: '<!-- ssr-preload-links -->',
        },
      },
      viteServer,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
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
    const config: RenderContentsConfig<'development'> = {
      mode: 'development',
      ssr: {
        ...ssr,
        entrypoint: new URL(
          '../../../tests/fixtures/ssr/entry-server-html-only.ts',
          import.meta.url
        ).pathname,
        placeholders: {
          ...ssr.placeholders,
          preloadedLinks: '<!-- ssr-preload-links -->',
        },
      },
      viteServer,
    };

    app.use(route, renderContents(config));

    const response = await request(app).get(route);

    expect(response.statusCode).toBe(HTTP_CODE.SUCCESS);
    expect(response.text).not.toContain('rel="preload"');
    expect(response.text).not.toContain(config.ssr.placeholders.preloadedLinks);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);
  });
});
