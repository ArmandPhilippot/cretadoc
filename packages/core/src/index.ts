import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createAPI } from '@cretadoc/api';
import { createServer } from '@cretadoc/server';
import { CONFIG_FILE_NAME, ROUTES } from './utils/constants';
import { loadServerConfig } from './utils/server/load-server-config';

export const createCretadocApp = async () => {
  const isProd = process.env['NODE_ENV'] === 'production';
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const config = await loadServerConfig(CONFIG_FILE_NAME, currentDir);
  const api = await createAPI({
    data: {
      pages: config.paths.pages ?? undefined,
    },
    endpoint: ROUTES.API,
  });

  return createServer({
    api,
    mode: isProd ? 'production' : 'development',
    ssr: {
      entrypoint: isProd
        ? new URL('../dist/server/entry-server.js', import.meta.url).pathname
        : new URL('./entry-server.tsx', import.meta.url).pathname,
      placeholders: {
        content: '<!--ssr-outlet-->',
        initialState: '<!--ssr-initial-state-->',
      },
      route: '/*',
      template: isProd
        ? new URL('../dist/client/index.html', import.meta.url).pathname
        : new URL('../index.html', import.meta.url).pathname,
    },
    staticDir: isProd
      ? {
          entrypoint: 'index.html',
          path: new URL('../dist/client', import.meta.url).pathname,
        }
      : undefined,
  });
};
