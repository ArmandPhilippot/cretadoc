import { readFileSync } from 'fs';
import { isObject, isObjKeyExist } from '@cretadoc/utils';
import type {
  Express,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type { ViteDevServer } from 'vite';
import type { ServerRender, SSRConfig } from '../types';
import { SUCCESS_CODE } from '../utils/constants';
import { invalid } from '../utils/errors';

type RenderImport = {
  render: ServerRender;
};

/**
 * Check if an imported value match the `RenderImport` type.
 *
 * @param {unknown} value - An imported value.
 * @returns {boolean} True if it is a `RenderImport` object.
 */
const isRenderImport = (value: unknown): value is RenderImport => {
  if (!isObject(value)) return false;
  if (!isObjKeyExist(value, 'render')) return false;
  if (typeof value.render !== 'function') return false;
  return true;
};

/**
 * Load a render method from the server entrypoint.
 *
 * @param {ViteDevServer} viteServer - A Vite server.
 * @param {string} entrypoint - The server entrypoint.
 * @returns {Promise<RenderImport>} The imported render method.
 */
const loadRenderMethod = async (
  viteServer: ViteDevServer,
  entrypoint: string
): Promise<RenderImport> => {
  const loadedEntrypoint = await viteServer.ssrLoadModule(entrypoint);

  if (!isRenderImport(loadedEntrypoint))
    throw new Error(invalid.config.ssr.entrypoint);

  return loadedEntrypoint;
};

export type ServerHandlers = {
  req: ExpressRequest;
  res: ExpressResponse;
  next: NextFunction;
};

/**
 * Render HTML contents.
 *
 * @param {ServerHandlers} handlers - The server handlers.
 * @param {ViteDevServer} viteServer - A Vite server.
 * @param {SSRConfig} config - The SSR configuration.
 */
const renderHTML = async (
  { next, req, res }: ServerHandlers,
  viteServer: ViteDevServer,
  { entrypoint, placeholders, template: templatePath }: SSRConfig
) => {
  try {
    const htmlTemplate = readFileSync(templatePath, 'utf8');
    const template = await viteServer.transformIndexHtml(
      req.originalUrl,
      htmlTemplate
    );
    const { render } = await loadRenderMethod(viteServer, entrypoint);
    const { html: appHtml } = await render(req.originalUrl);
    const html = template.replace(placeholders.content, appHtml);

    res.status(SUCCESS_CODE).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    const error = e as Error;
    viteServer.ssrFixStacktrace(error);
    next(error);
  }
};

/**
 * Use SSR template to render HTML contents.
 *
 * @param {Express} app - An Express application.
 * @param {ViteDevServer} viteServer - A Vite server.
 * @param {SSRConfig} ssr - The SSR configuration.
 */
export const renderWithSSR = (
  app: Express,
  viteServer: ViteDevServer,
  ssr: SSRConfig
) => {
  app.get(ssr.route, (req, res, next) => {
    void (async () => {
      await renderHTML({ req, res, next }, viteServer, ssr);
    })();
  });
};
