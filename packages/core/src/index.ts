import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAPI } from '@cretadoc/api';
import { createServer } from '@cretadoc/server';
import { CONFIG_FILE_NAME, ROUTES } from './utils/constants';
import { loadServerConfig } from './utils/server';

export const createCretadocApp = async () => {
  const isProd = process.env['NODE_ENV'] === 'production';
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const config = await loadServerConfig(CONFIG_FILE_NAME, currentDir);
  const api = await createAPI({
    data: {
      doc: config.paths.doc
        ? {
            baseUrl: relative(process.cwd(), config.paths.doc),
            path: config.paths.doc,
          }
        : undefined,
      pages: config.paths.pages
        ? {
            baseUrl: relative(process.cwd(), config.paths.pages),
            path: config.paths.pages,
          }
        : undefined,
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
      route: '/*',
    },
    staticDir: isProd
      ? {
          entrypoint: 'index.html',
          path: new URL('../dist/client', import.meta.url).pathname,
        }
      : undefined,
  });
};
