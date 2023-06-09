import { readFileSync } from 'fs';
import type { RequestHandler } from 'express';
import type { ViteDevServer } from 'vite';
import type {
  Render,
  SSRConfig,
  SSRPlaceholders,
  ServerMode,
} from '../../types';
import type { RenderImport } from '../../types/internal';
import { ENVIRONMENT, HTTP_CODE } from '../../utils/constants';
import { getPreloadLinkElements, isRenderImport } from '../../utils/helpers';

export type RenderContentsConfig<M extends ServerMode> = {
  mode: M;
  ssr: Omit<SSRConfig, 'route'>;
  viteServer?: M extends typeof ENVIRONMENT.PRODUCTION ? never : ViteDevServer;
};

/**
 * Load a render method from the server entrypoint.
 *
 * @param {string} entrypoint - The entrypoint path.
 * @param {Omit<RenderContentsConfig<M>, 'ssr'>} config - The configuration.
 * @returns {Promise<RenderImport>} The imported render method.
 */
const loadRenderMethod = async <M extends ServerMode>(
  entrypoint: string,
  { mode, viteServer }: Omit<RenderContentsConfig<M>, 'ssr'>
): Promise<RenderImport> => {
  const isProd = mode === ENVIRONMENT.PRODUCTION;
  const loadedEntrypoint =
    !isProd && viteServer
      ? await viteServer.ssrLoadModule(entrypoint)
      : ((await import(entrypoint)) as unknown);

  if (!isRenderImport(loadedEntrypoint))
    throw new Error('The server entrypoint must export a render function.');

  return loadedEntrypoint;
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
 * Render the HTML template for the given url.
 *
 * @param {string} url - The URL to render.
 * @param {RenderContentsConfig<M>} config - The configuration.
 * @returns {Promise<string>} The generated HTML.
 */
const renderHTMLTemplate = async <M extends ServerMode>(
  url: string,
  { mode, ssr, viteServer }: RenderContentsConfig<M>
): Promise<string> => {
  const isProd = mode === ENVIRONMENT.PRODUCTION;
  const { entrypoint, placeholders, template: templatePath } = ssr;
  const htmlTemplate = readFileSync(templatePath, 'utf8');
  const template =
    !isProd && viteServer
      ? await viteServer.transformIndexHtml(url, htmlTemplate)
      : htmlTemplate;
  const { render } = await loadRenderMethod(entrypoint, { mode, viteServer });
  const rendered = await render(url);

  return generateHTML(template, placeholders, rendered);
};

export const renderContents =
  <M extends ServerMode>({
    mode,
    ssr,
    viteServer,
  }: RenderContentsConfig<M>): RequestHandler =>
  async (req, res, next) => {
    try {
      const html = await renderHTMLTemplate(req.originalUrl, {
        mode,
        ssr,
        viteServer,
      });
      res
        .status(HTTP_CODE.SUCCESS)
        .set({ 'Content-Type': 'text/html' })
        .end(html);
    } catch (error) {
      if (viteServer && error instanceof Error)
        viteServer.ssrFixStacktrace(error);
      else next(error);
    }
  };
