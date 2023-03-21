import { createServer as createCretadocServer } from './src';

const createServer = () => {
  const staticDirPath = new URL('./tests/fixtures/static-dir/', import.meta.url)
    .pathname;

  return createCretadocServer({
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
