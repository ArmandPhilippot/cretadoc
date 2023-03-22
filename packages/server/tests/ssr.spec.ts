import { describe, it } from 'vitest';
import { createServer } from '../src';
import { DEFAULT_SSR_ROUTE } from '../src/utils/constants';
import { invalid, missing } from '../src/utils/errors';
import { render } from './fixtures/ssr/entry-server';
import { render as renderWithoutState } from './fixtures/ssr/entry-server-without-state';
import { expect } from './utils';

describe('ssr', () => {
  it('renders the HTML contents using the default route', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const entrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint,
        placeholders: {
          content: contentPlaceholder,
        },
        template,
      },
    });

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 200,
      text: (await render('')).html,
    });
    expect.assertions(1);
  });

  it('renders the HTML contents using a custom route', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const entrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const endpoint = '/custom';
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint,
        placeholders: {
          content: contentPlaceholder,
        },
        route: endpoint,
        template,
      },
    });

    await expect({ server, endpoint }).toRespondWith({
      statusCode: 200,
      text: (await render('')).html,
    });
    expect.assertions(1);
  });

  it('accepts a custom HMR port', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const serverEntrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const hmrPort = 4698;
    const server = await createServer({
      hostname: 'localhost',
      hmr: {
        port: hmrPort,
      },
      port: 4300,
      ssr: {
        entrypoint: serverEntrypoint,
        placeholders: {
          content: contentPlaceholder,
        },
        template,
      },
    });

    expect(server.config.hmr?.port).toBe(hmrPort);
    expect.assertions(1);
  });

  it('renders the initial state', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const serverEntrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: serverEntrypoint,
        placeholders: {
          content: contentPlaceholder,
          initialState: '<!-- ssr-initial-state -->',
        },
        template,
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
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const serverEntrypoint = new URL(
      './fixtures/ssr/entry-server-without-state.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4300,
      ssr: {
        entrypoint: serverEntrypoint,
        placeholders: {
          content: contentPlaceholder,
          initialState: '<!-- ssr-initial-state -->',
        },
        template,
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

  it('throws an error when server entrypoint is not provided', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;

    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          placeholders: {
            content: contentPlaceholder,
          },
          template,
        },
      })
    ).rejects.toThrowError(missing.config.ssr.entrypoint);
    expect.assertions(1);
  });

  it('throws an error when the server entrypoint is invalid', async () => {
    const contentPlaceholder = '<!-- ssr-outlet -->';
    const serverEntrypoint = new URL(
      './fixtures/ssr/invalid-entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;
    const server = await createServer({
      hostname: 'localhost',
      port: 4400,
      ssr: {
        entrypoint: serverEntrypoint,
        placeholders: {
          content: contentPlaceholder,
        },
        template,
      },
    });

    await expect({ server, endpoint: DEFAULT_SSR_ROUTE }).toRespondWith({
      statusCode: 500,
      text: new RegExp(invalid.config.ssr.entrypoint),
    });
    expect.assertions(1);
  });

  it('throws an error when content placeholder is not provided', async () => {
    const serverEntrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;
    const template = new URL('./fixtures/ssr/index.html', import.meta.url)
      .pathname;

    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          entrypoint: serverEntrypoint,
          placeholders: {},
          template,
        },
      })
    ).rejects.toThrowError(missing.config.ssr.placeholders);
    expect.assertions(1);
  });

  it('throws an error when the template is not provided', async () => {
    const serverEntrypoint = new URL(
      './fixtures/ssr/entry-server.ts',
      import.meta.url
    ).pathname;

    await expect(async () =>
      createServer({
        hostname: 'localhost',
        port: 4200,
        ssr: {
          entrypoint: serverEntrypoint,
          placeholders: {
            content: '<!-- ssr-outlet -->',
          },
        },
      })
    ).rejects.toThrowError(missing.config.ssr.template);
    expect.assertions(1);
  });
});
