import { isObject, isObjKeyExist, type Maybe } from '@cretadoc/utils';
import type { RequestHandler } from 'express';
import type { ViteDevServer } from 'vite';
import type { RenderFn, SSRConfig } from '../../types';
import { SERVER_ERROR_CODE } from '../../utils/constants';
import { CretadocServerError } from '../../utils/exceptions';

type ValidExports = {
  /**
   * The render method.
   */
  render: RenderFn;
};

/**
 * Check if the given value matches the `RenderFn` type.
 *
 * @param {unknown} value - A value to validate.
 * @returns {boolean} True if it is a function.
 */
const isFunction = (value: unknown): value is RenderFn => {
  if (typeof value !== 'function') return false;
  return true;
};

/**
 * Check if an imported value match the `ValidExports` type.
 *
 * @param {unknown} value - A value to validate.
 * @returns {boolean} True if the export is valid.
 */
export const isValidExports = (value: unknown): value is ValidExports => {
  if (!isObject(value)) return false;
  if (!isObjKeyExist(value, 'render')) return false;
  if (!isFunction(value.render)) return false;
  return true;
};

/**
 * Import the render method from the given entrypoint.
 *
 * @param {string} entrypoint - The path of the server entrypoint.
 * @param {Maybe<ViteDevServer>} viteServer - The Vite server in dev mode.
 * @returns {Promise<RenderFn>} The render method.
 */
const importRenderMethod = async (
  entrypoint: string,
  viteServer: Maybe<ViteDevServer>
): Promise<RenderFn> => {
  const allExports = viteServer
    ? await viteServer.ssrLoadModule(entrypoint)
    : ((await import(entrypoint)) as unknown);

  if (!isValidExports(allExports))
    throw new CretadocServerError(
      SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR,
      'The server entrypoint must export a render function.'
    );

  return allExports.render;
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
      const render = await importRenderMethod(config.entrypoint, viteServer);
      await render({ req, res, viteServer });
    } catch (error) {
      if (viteServer && error instanceof Error)
        viteServer.ssrFixStacktrace(error);

      next(error);
    }
  };
