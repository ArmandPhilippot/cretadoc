import { isObject } from './types';

/**
 * Check if an object key exists.
 *
 * @param obj - An object.
 * @param key - The expected object key.
 * @returns {boolean} True if the key exists in the object.
 */
export const isObjKeyExist = <T extends object, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> => {
  if (!isObject(obj)) throw new Error('First argument must be an object.');

  return obj[key] !== undefined;
};
