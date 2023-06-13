import { isObjKeyExist, isObject } from '@cretadoc/utils';
import type { RenderFunction } from '../../types';
import type { ValidRenderExport } from '../../types/internal';

/**
 * Check if the given value matches the `RenderFunction` type.
 *
 * @param {unknown} value - A value to validate.
 * @returns {boolean} True if it is a function.
 */
const isRenderFunction = (value: unknown): value is RenderFunction => {
  if (typeof value !== 'function') return false;
  return true;
};

/**
 * Check if an imported value match the `ValidRenderExport` type.
 *
 * @param {unknown} value - A value to validate.
 * @returns {boolean} True if the export is valid.
 */
export const isValidRenderExport = (
  value: unknown
): value is ValidRenderExport => {
  if (!isObject(value)) return false;
  if (!isObjKeyExist(value, 'render')) return false;
  if (!isRenderFunction(value.render)) return false;
  return true;
};
