/* eslint-disable max-statements */
import { describe, it } from 'vitest';
import { createServer } from '../src';
import { DEFAULT_SSR_ROUTE } from '../src/utils/constants';
import { invalid, missing } from '../src/utils/errors';
import { render } from './fixtures/ssr/entry-server';
import { render as renderWithoutState } from './fixtures/ssr/entry-server-html-only';
import { expect } from './utils';

describe('ssr', () => {
  it('renders the HTML contents using the default route', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
          .pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    const { html } = await render('');

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: html,
    });
    expect.assertions(1);
  });

  it('renders the HTML contents using a custom route', async () => {
    const endpoint = '/custom';
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
          .pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
        },
        route: endpoint,
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    await expect({ server, endpoint }).toRespondWith({
      statusCode: 200,
      text: (await render('')).html,
    });
    expect.assertions(1);
  });

  it('renders the initial state', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
          .pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
          initialState: '<!-- ssr-initial-state -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });
    const { initialState } = await render('');

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: `\n<script>window.__INITIAL_STATE__=${JSON.stringify(
        initialState
      )}</script>`,
      textShouldMatch: true,
    });
    expect.assertions(1);
  });

  it('does not render the initial state if it is not provided', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL(
          './fixtures/ssr/entry-server-html-only.ts',
          import.meta.url
        ).pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
          initialState: '<!-- ssr-initial-state -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });
    const { initialState } = await renderWithoutState('');

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: `\n<script>window.__INITIAL_STATE__=${JSON.stringify(
        initialState
      )}</script>`,
      textShouldMatch: false,
    });
    expect.assertions(1);
  });

  it('renders the links to preload in document head', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
          .pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
          preloadedLinks: '<!-- ssr-preload-links -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'rel="preload"',
      textShouldMatch: true,
    });
    expect.assertions(1);
  });

  it('does not render the links in document head if not provided', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: new URL(
          './fixtures/ssr/entry-server-html-only.ts',
          import.meta.url
        ).pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
          preloadedLinks: '<!-- ssr-preload-links -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: 'rel="preload"',
      textShouldMatch: false,
    });
    expect.assertions(1);
  });

  it('renders the HTML in production mode', async () => {
    const server = await createServer({
      hostname: 'localhost',
      mode: 'production',
      port: 4400,
      ssr: {
        entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
          .pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    const { html } = await render('');

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: html,
    });
    expect.assertions(1);
  });

  it('throws an error when server entrypoint is not provided', async () => {
    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          placeholders: {
            content: '<!-- ssr-outlet -->',
          },
          template: new URL('./fixtures/ssr/index.html', import.meta.url)
            .pathname,
        },
      })
    ).rejects.toThrowError(missing.config.ssr.entrypoint);
    expect.assertions(1);
  });

  it('throws an error when the server entrypoint is invalid', async () => {
    const server = await createServer({
      hostname: 'localhost',
      port: 4400,
      ssr: {
        entrypoint: new URL(
          './fixtures/ssr/invalid-entry-server.ts',
          import.meta.url
        ).pathname,
        placeholders: {
          content: '<!-- ssr-outlet -->',
        },
        template: new URL('./fixtures/ssr/index.html', import.meta.url)
          .pathname,
      },
    });

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 500,
      text: new RegExp(invalid.config.ssr.entrypoint),
    });
    expect.assertions(1);
  });

  it('throws an error when content placeholder is not provided', async () => {
    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
            .pathname,
          placeholders: {},
          template: new URL('./fixtures/ssr/index.html', import.meta.url)
            .pathname,
        },
      })
    ).rejects.toThrowError(missing.config.ssr.placeholders);
    expect.assertions(1);
  });

  it('throws an error when the template is not provided', async () => {
    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          entrypoint: new URL('./fixtures/ssr/entry-server.ts', import.meta.url)
            .pathname,
          placeholders: {
            content: '<!-- ssr-outlet -->',
          },
        },
      })
    ).rejects.toThrowError(missing.config.ssr.template);
    expect.assertions(1);
  });
});
