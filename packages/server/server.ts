import { createAPI } from '@cretadoc/api';
import { createServer as createCretadocServer } from './src';

const api = createAPI();

const createServer = () => {
  const staticDirPath = new URL('./tests/fixtures/static-dir/', import.meta.url)
    .pathname;

  return createCretadocServer({
    api: {
      instance: api,
    },
    hostname: 'localhost',
    port: 4000,
    staticDir: {
      entrypoint: 'custom.html',
      path: staticDirPath,
    },
  });
};

const app = createServer();

app.start();
