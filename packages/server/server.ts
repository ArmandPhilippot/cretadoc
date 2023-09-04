import { createAPI } from '@cretadoc/api';
import { createServer as createCretadocServer } from './src';

const api = await createAPI();

const createServer = async () => {
  const serverEntrypoint = new URL(
    './tests/fixtures/ssr/entry-server.ts',
    import.meta.url
  ).pathname;
  const staticDirPath = new URL('./tests/fixtures/static-dir/', import.meta.url)
    .pathname;

  return createCretadocServer({
    api,
    hostname: 'localhost',
    port: 4000,
    ssr: {
      entrypoint: serverEntrypoint,
    },
    staticDir: {
      entrypoint: 'custom.html',
      path: staticDirPath,
    },
  });
};

const app = await createServer();

app.start();
