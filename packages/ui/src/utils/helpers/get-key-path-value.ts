import { type KeyPathIn, getValueByKeyPath, isString } from '@cretadoc/utils';

/**
 * Retrieve a value in an object from a key path.
 *
 * @param {T} obj - An object.
 * @param {KeyPathIn<T>} path - A key path in object.
 * @returns {string} The contract value.
 */
export const getKeyPathValue = <T extends Record<string, unknown>>(
  obj: T,
  path: KeyPathIn<T>
): string => {
  const value = getValueByKeyPath(obj, path);

  return isString(value) ? value : '';
};
