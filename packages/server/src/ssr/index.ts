import { readFileSync } from 'fs';
import type {
  Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type { ViteDevServer } from 'vite';
import type { Render, SSRConfig, SSRPlaceholders, ServerMode } from '../types';
import type { RenderImport } from '../types/internal';
import { ENVIRONMENT, HTTP_CODE } from '../utils/constants';
import { invalid } from '../utils/errors';
import { getPreloadLinkElements, isRenderImport } from '../utils/helpers';

type RenderWithSSRConfig<M extends ServerMode> = {
  mode: M;
  ssr: SSRConfig;
  viteServer?: M extends typeof ENVIRONMENT.PRODUCTION ? never : ViteDevServer;
};

/**
 * Load a render method from the server entrypoint.
 *
 * @param {string} entrypoint - The entrypoint path.
 * @param {Omit<RenderWithSSRConfig<M>, 'ssr'>} config - The configuration.
 * @returns {Promise<RenderImport>} The imported render method.
 */
const loadRenderMethod = async <M extends ServerMode>(
  entrypoint: string,
  { mode, viteServer }: Omit<RenderWithSSRConfig<M>, 'ssr'>
): Promise<RenderImport> => {
  const isProd = mode === ENVIRONMENT.PRODUCTION;
  const loadedEntrypoint =
    !isProd && viteServer
      ? await viteServer.ssrLoadModule(entrypoint)
      : ((await import(entrypoint)) as unknown);

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

export type ServerHandlers = {
  req: ExpressRequest;
  res: ExpressResponse;
};

/**
 * Generate the HTML contents for the given url.
 *
 * @param {string} url - The URL to render.
 * @param {RenderWithSSRConfig<M>} config - The configuration.
 * @returns {Promise<string>} The generated HTML.
 */
const generateHTML = async <M extends ServerMode>(
  url: string,
  { mode, ssr, viteServer }: RenderWithSSRConfig<M>
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

  return generateHTMLContents(template, placeholders, rendered);
};

/**
 * Render HTML template.
 *
 * @param {ServerHandlers} handlers - The server handlers.
 * @param {RenderWithSSRConfig<M>} config - The configuration.
 */
const renderHTMLTemplate = async <M extends ServerMode>(
  { req, res }: ServerHandlers,
  { mode, viteServer, ...config }: RenderWithSSRConfig<M>
) => {
  const isProd = mode === ENVIRONMENT.PRODUCTION;

  try {
    const html = await generateHTML(req.originalUrl, {
      ...config,
      mode,
      viteServer,
    });
    res
      .status(HTTP_CODE.SUCCESS)
      .set({ 'Content-Type': 'text/html' })
      .end(html);
  } catch (e) {
    const error = e as Error;

    if (!isProd && viteServer) viteServer.ssrFixStacktrace(error);

    console.error(error);
    res.status(HTTP_CODE.ERROR).end((error as NodeJS.ErrnoException).stack);
  }
};

/**
 * Use SSR template to render HTML contents.
 *
 * @param {Express} app - An Express application.
 * @param {RenderWithSSRConfig<M>} config - The configuration.
 */
export const renderWithSSR = <M extends ServerMode>(
  app: Express,
  { ssr, ...config }: RenderWithSSRConfig<M>
) => {
  app.get(ssr.route, (req, res) => {
    void (async () => {
      await renderHTMLTemplate({ req, res }, { ...config, ssr });
    })();
  });
};
