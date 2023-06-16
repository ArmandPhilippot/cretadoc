import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { RenderFunction } from '@cretadoc/server';
import { LinkProvider } from '@cretadoc/ui';
import { isObjKeyExist, isObject } from '@cretadoc/utils';
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
import { RouterLink } from './components';
import { createRoutes } from './routes';
import { loadClientConfig } from './utils/client';
import { CONFIG_FILE_NAME } from './utils/constants';
import { ConfigProvider } from './utils/contexts';
import { RouterError } from './utils/exceptions';
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

export const render: RenderFunction = async (url, req) => {
  const config = await loadClientConfig(CONFIG_FILE_NAME, currentDir);
  const handler = createStaticHandler(createRoutes(config));
  const context = await getContextFrom(handler, req, url);
  const router = createStaticRouter(handler.dataRoutes, context);
  const html = ReactDOMServer.renderToString(
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

  return {
    html,
    initialState: { config },
  };
};
