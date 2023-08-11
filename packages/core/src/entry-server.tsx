import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { RenderFn } from '@cretadoc/server';
import { LinkProvider } from '@cretadoc/ui';
import {
  HTTP_STATUS_CODE,
  type Maybe,
  isObjKeyExist,
  isObject,
} from '@cretadoc/utils';
import type { Request as ExpressRequest } from 'express';
import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider } from 'react-intl';
import {
  type StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import type { ViteDevServer } from 'vite';
import { RouterLink } from './components';
import { createRoutes } from './routes';
import { loadClientConfig } from './utils/client';
import { CONFIG_FILE_NAME } from './utils/constants';
import { ConfigProvider } from './utils/contexts';
import { CretadocCoreError, RouterError } from './utils/exceptions';
import { createFetchRequest } from './utils/server';

const currentDir = dirname(fileURLToPath(import.meta.url));

const isResponse = (value: unknown): value is Response => {
  if (!isObject(value)) return false;

  if (!isObjKeyExist(value, 'status') || typeof value.status !== 'number')
    return false;

  if (
    !isObjKeyExist(value, 'statusText') ||
    typeof value.statusText !== 'string'
  )
    return false;

  if (!isObjKeyExist(value, 'headers') || !isObject(value.headers))
    return false;

  return true;
};

const getContextFrom = async (
  handler: ReturnType<typeof createStaticHandler>,
  req: ExpressRequest,
  url: string
): Promise<StaticHandlerContext> => {
  const context = await handler.query(createFetchRequest(req, url));

  if (!isResponse(context)) return context;

  throw new RouterError('The router returned a wrong response type.');
};

/**
 * Retrieve the url from the server request.
 *
 * @param {ExpressRequest} req - The server request.
 * @returns {string} The requested url.
 */
const getUrlFrom = (req: ExpressRequest): string => {
  const host = req.get('host');

  if (!host)
    throw new CretadocCoreError(
      'Entry server',
      'Invalid request: cannot read host.'
    );

  const urlOrigin = `${req.protocol}://${host}`;

  return new URL(req.originalUrl || req.url, urlOrigin).href;
};

/**
 * Retrieve the HTML template.
 *
 * @param {string} path - The template path.
 * @param {string} url - The requested url.
 * @param {Maybe<ViteDevServer>} viteServer - The Vite server.
 * @returns {Promise<string>} The HTML template.
 */
const getHTMLTemplate = async (
  path: string,
  url: string,
  viteServer: Maybe<ViteDevServer>
): Promise<string> => {
  const htmlTemplate = readFileSync(path, 'utf8');

  return viteServer
    ? viteServer.transformIndexHtml(url, htmlTemplate)
    : htmlTemplate;
};

type SSRConfig = {
  placeholders: { content: string; initialState: string };
  rendered: { content: string; initialState: Record<string, unknown> };
  templatePath: string;
};

/**
 * Generate the HTML.
 *
 * It will replace the given placeholders with the rendered contents.
 *
 * @param {string} url - The URL to render.
 * @param {SSRConfig} config - The SSR config.
 * @param {Maybe<ViteDevServer>} viteServer - The Vite server in dev mode.
 * @returns {string} The generated HTML.
 */
const generateHTML = async (
  url: string,
  { placeholders, rendered, templatePath }: SSRConfig,
  viteServer: Maybe<ViteDevServer>
): Promise<string> => {
  const htmlTemplate = await getHTMLTemplate(templatePath, url, viteServer);
  const stateScript = `\n<script>window.__INITIAL_STATE__='${JSON.stringify(
    rendered.initialState
  )}'</script>`;

  return htmlTemplate
    .replace(placeholders.content, rendered.content)
    .replace(placeholders.initialState, stateScript);
};

export const render: RenderFn = async ({ req, res, viteServer }) => {
  const url = getUrlFrom(req);
  const config = await loadClientConfig(CONFIG_FILE_NAME, currentDir);
  const handler = createStaticHandler(createRoutes(config));
  const context = await getContextFrom(handler, req, url);
  const router = createStaticRouter(handler.dataRoutes, context);
  const body = ReactDOMServer.renderToString(
    <StrictMode>
      <ConfigProvider config={config}>
        <IntlProvider locale={config.locale}>
          <LinkProvider value={RouterLink}>
            <StaticRouterProvider context={context} router={router} />
          </LinkProvider>
        </IntlProvider>
      </ConfigProvider>
    </StrictMode>
  );
  const html = await generateHTML(
    url,
    {
      placeholders: {
        content: '<!--ssr-outlet-->',
        initialState: '<!--ssr-initial-state-->',
      },
      rendered: { content: body, initialState: { config } },
      templatePath: import.meta.env.PROD
        ? new URL('../dist/client/index.html', import.meta.url).pathname
        : new URL('../index.html', import.meta.url).pathname,
    },
    viteServer
  );
  res
    .status(HTTP_STATUS_CODE.OK)
    .set({ 'Content-Type': 'text/html' })
    .end(html);
};
