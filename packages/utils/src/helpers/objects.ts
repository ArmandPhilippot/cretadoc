import type { ReadonlyDeep } from '../types';
import { isObject } from './types';

/**
 * Recursively freeze an object.
 *
 * @param {T} obj - An object.
 * @returns {ReadonlyDeep<T>} An object deeply frozen.
 */
export const deepFreeze = <T extends Record<number | string | symbol, unknown>>(
  obj: T
): ReadonlyDeep<T> => {
  if (!isObject(obj)) throw new Error('The argument must be an object.');

  const immutableObj = { ...obj };

  for (const key of Object.getOwnPropertyNames(immutableObj)) {
    const value = immutableObj[key];
    if (isObject(value) && !Object.isFrozen(value)) deepFreeze(value);
  }

  return Object.freeze(immutableObj) as ReadonlyDeep<T>;
};

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
