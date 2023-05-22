import { createAPI } from '@cretadoc/api';
import { createServer } from '@cretadoc/server';

export const createCretadocApp = async () => {
  const isProd = process.env['NODE_ENV'] === 'production';
  const apiRoute = '/api';
  const api = createAPI({
    data: {},
    endpoint: apiRoute,
  });

  return createServer({
    api: {
      instance: api,
      route: apiRoute,
    },
    mode: isProd ? 'production' : 'development',
    ssr: {
      entrypoint: isProd
        ? new URL('../dist/server/entry-server.js', import.meta.url).pathname
        : new URL('./entry-server.tsx', import.meta.url).pathname,
      placeholders: {
        content: '<!--ssr-outlet-->',
        initialState: '<!--ssr-initial-state-->',
      },
      template: isProd
        ? new URL('../dist/client/index.html', import.meta.url).pathname
        : new URL('../index.html', import.meta.url).pathname,
    },
    staticDir: {
      entrypoint: 'index.html',
      path: isProd
        ? new URL('../dist/client', import.meta.url).pathname
        : new URL('../', import.meta.url).pathname,
    },
  });
};
