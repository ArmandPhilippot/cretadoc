import { dirname } from 'path';
import { fileURLToPath } from 'url';
import type { RenderFn } from '@cretadoc/server';
import { HTTP_STATUS_CODE, isObjKeyExist, isObject } from '@cretadoc/utils';
import type { Request as ExpressRequest } from 'express';
import { StrictMode } from 'react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import {
  type StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { App } from './app';
import { AppError, Html } from './components';
import { createRoutes } from './routes';
import { loadClientConfig } from './utils/client';
import { CONFIG_FILE_NAME } from './utils/constants';
import { CretadocCoreError, RouterError } from './utils/exceptions';
import { createFetchRequest } from './utils/server';
import { loadMetadata } from './utils/shared';

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
 * @returns {URL} The requested url.
 */
const getUrlFrom = (req: ExpressRequest): URL => {
  const host = req.get('host');

  if (!host)
    throw new CretadocCoreError(
      'Entry server',
      'Invalid request: cannot read host.'
    );

  const urlOrigin = `${req.protocol}://${host}`;

  return new URL(req.originalUrl || req.url, urlOrigin);
};

export const render: RenderFn = async ({ req, res }) => {
  const url = getUrlFrom(req);
  const config = await loadClientConfig(CONFIG_FILE_NAME, currentDir);
  const handler = createStaticHandler(createRoutes(config));
  const context = await getContextFrom(handler, req, url.href);
  const router = createStaticRouter(handler.dataRoutes, context);
  const meta = await loadMetadata(url.href, config);

  // cSpell:ignore-word pipeable
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <Html config={config} meta={meta} url={url}>
        <App
          config={config}
          router={<StaticRouterProvider context={context} router={router} />}
        />
      </Html>
    </StrictMode>,
    {
      onShellReady() {
        res.status(HTTP_STATUS_CODE.OK).setHeader('content-type', 'text/html');
        pipe(res);
      },
      onShellError(err) {
        const html = renderToString(
          <Html config={config} meta={meta} url={url}>
            <AppError error={err} />
          </Html>
        );

        res
          .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
          .setHeader('content-type', 'text/html');
        res.send(`<!DOCTYPE html>${html}`);
      },
      onError(error) {
        console.error(error);
      },
    }
  );
};
