import { readFileSync } from 'fs';
import { HTTP_STATUS_CODE } from '@cretadoc/utils';
import type { Request as ExpressRequest, RequestHandler } from 'express';
import type { ViteDevServer } from 'vite';
import type { Render, SSRConfig, SSRPlaceholders } from '../../types';
import type { ValidRenderExport } from '../../types/internal';
import { SERVER_ERROR_CODE } from '../../utils/constants';
import { CretadocServerError } from '../../utils/exceptions';
import {
  getPreloadLinkElements,
  getUrlFrom,
  isValidRenderExport,
} from '../../utils/helpers';

/**
 * Retrieve the named exports from the server entrypoint.
 *
 * @param {string} entrypoint - The entrypoint path.
 * @param {ViteDevServer} [viteServer] - The Vite server.
 * @returns {Promise<ValidRenderExport>} The exported render method and routes.
 */
const getEntrypointExports = async (
  entrypoint: string,
  viteServer?: ViteDevServer
): Promise<ValidRenderExport> => {
  const loadedExports = viteServer
    ? await viteServer.ssrLoadModule(entrypoint)
    : ((await import(entrypoint)) as unknown);

  if (!isValidRenderExport(loadedExports))
    throw new CretadocServerError(
      SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR,
      'The server entrypoint must export a render function.'
    );

  return loadedExports;
};

/**
 * Generate the HTML.
 *
 * It will replace the given placeholders with the rendered contents.
 *
 * @param {string} template - The HTML template.
 * @param {SSRPlaceholders} placeholders - The SSR placeholders.
 * @param {Render} rendered - The rendered contents.
 * @returns {string} The generated HTML.
 */
const generateHTML = (
  template: string,
  placeholders: SSRPlaceholders,
  rendered: Render
): string => {
  let html = template.replace(placeholders.content, rendered.html);

  if (placeholders.initialState) {
    const stateScript = rendered.initialState
      ? `\n<script>window.__INITIAL_STATE__='${JSON.stringify(
          rendered.initialState
        )}'</script>`
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

/**
 * Retrieve the HTML template.
 *
 * @param {string} path - The template path.
 * @param {string} url - The requested url.
 * @param {ViteDevServer} [viteServer] - The Vite server.
 * @returns {Promise<string>} The HTML template.
 */
const getHTMLTemplate = async (
  path: string,
  url: string,
  viteServer?: ViteDevServer
): Promise<string> => {
  const htmlTemplate = readFileSync(path, 'utf8');

  return viteServer
    ? viteServer.transformIndexHtml(url, htmlTemplate)
    : htmlTemplate;
};

/**
 * Render the HTML template for the given url.
 *
 * @param {ExpressRequest} req - The server request.
 * @param {Omit<SSRConfig, 'route'>} config - The SSR configuration.
 * @param {ViteDevServer} [viteServer] - The Vite server.
 * @returns {Promise<string>} The generated HTML.
 */
const renderHTMLTemplate = async (
  req: ExpressRequest,
  config: Omit<SSRConfig, 'route'>,
  viteServer?: ViteDevServer
): Promise<string> => {
  const { entrypoint, placeholders, template } = config;
  const url = getUrlFrom(req);
  const htmlTemplate = await getHTMLTemplate(template, url, viteServer);
  const { render } = await getEntrypointExports(entrypoint, viteServer);
  const rendered = await render(url, req);

  return generateHTML(htmlTemplate, placeholders, rendered);
};

/**
 * Express middleware to render contents using SSR.
 *
 * @param {Omit<SSRConfig, 'route'>} config - The SSR configuration.
 * @param {ViteDevServer} [viteServer] - The Vite server.
 * @returns {RequestHandler}
 */
export const renderContents =
  (
    config: Omit<SSRConfig, 'route'>,
    viteServer?: ViteDevServer
  ): RequestHandler =>
  async (req, res, next) => {
    try {
      const html = await renderHTMLTemplate(req, config, viteServer);
      res
        .status(HTTP_STATUS_CODE.OK)
        .set({ 'Content-Type': 'text/html' })
        .end(html);
    } catch (error) {
      if (viteServer && error instanceof Error)
        viteServer.ssrFixStacktrace(error);
      else next(error);
    }
  };
