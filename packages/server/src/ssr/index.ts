import { readFileSync } from 'fs';
import { isObject, isObjKeyExist } from '@cretadoc/utils';
import type {
  Express,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type { ViteDevServer } from 'vite';
import type {
  Render,
  ServerRender,
  SSRConfig,
  SSRPlaceholders,
} from '../types';
import { SUCCESS_CODE } from '../utils/constants';
import { invalid } from '../utils/errors';
import { getPreloadLinkElements } from '../utils/preloaded-links';

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

/**
 * Replace the placeholders with rendered contents.
 *
 * @param {string} template - The HTML template.
 * @param {SSRPlaceholders} placeholders - The SSR placeholders.
 * @param {Render} rendered - The rendered contents.
 * @returns {string} The generated HTML.
 */
const generateHTMLContents = (
  template: string,
  placeholders: SSRPlaceholders,
  rendered: Render
): string => {
  let html = template.replace(placeholders.content, rendered.html);

  if (placeholders.initialState) {
    const stateScript = rendered.initialState
      ? `\n<script>window.__INITIAL_STATE__=${JSON.stringify(
          rendered.initialState
        )}</script>`
      : '';
    html = html.replace(placeholders.initialState, stateScript);
  }

  if (placeholders.preloadedLinks) {
    const preloadedLinks = rendered.preloadedLinks
      ? getPreloadLinkElements(rendered.preloadedLinks)
      : '';
    html = html.replace(placeholders.preloadedLinks, preloadedLinks);
  }

  return html;
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
    const rendered = await render(req.originalUrl);
    const html = generateHTMLContents(template, placeholders, rendered);

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
