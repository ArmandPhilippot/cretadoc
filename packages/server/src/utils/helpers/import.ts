import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { RenderImport } from '../../types/internal';

/**
 * Check if an imported value match the `RenderImport` type.
 *
 * @param {unknown} value - An imported value.
 * @returns {boolean} True if it is a `RenderImport` object.
 */
export const isRenderImport = (value: unknown): value is RenderImport => {
  if (!isObject(value)) return false;
  if (!isObjKeyExist(value, 'render')) return false;
  if (typeof value.render !== 'function') return false;
  return true;
};
