import { createAPI } from '@cretadoc/api';
import { createServer as createCretadocServer } from './src';

const api = createAPI();

const createServer = async () => {
  const contentPlaceholder = '<!-- ssr-outlet -->';
  const serverEntrypoint = new URL(
    './tests/fixtures/ssr/entry-server.ts',
    import.meta.url
  ).pathname;
  const template = new URL('./tests/fixtures/ssr/index.html', import.meta.url)
    .pathname;
  const staticDirPath = new URL('./tests/fixtures/static-dir/', import.meta.url)
    .pathname;

  return createCretadocServer({
    api: {
      instance: api,
    },
    hostname: 'localhost',
    port: 4000,
    ssr: {
      entrypoint: serverEntrypoint,
      placeholders: {
        content: contentPlaceholder,
      },
      template,
    },
    staticDir: {
      entrypoint: 'custom.html',
      path: staticDirPath,
    },
  });
};

const app = await createServer();

app.start();
