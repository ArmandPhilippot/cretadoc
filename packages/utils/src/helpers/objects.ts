import type { KeyPathIn, KeyPathValueIn, ReadonlyDeep } from '../types';
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
 * Retrieve a value in an object using a key path.
 *
 * @param {T} obj - An object.
 * @param {P} path - A key path in dot notation.
 * @returns {KeyPathValueIn<T, P>} The key path value.
 */
export const getValueByKeyPath = <
  T extends Record<string, unknown>,
  P extends KeyPathIn<T>
>(
  obj: T,
  path: P
): KeyPathValueIn<T, P> => {
  const sep = '.';
  const firstSepIndex = path.indexOf(sep);

  if (firstSepIndex === -1) return obj[path] as KeyPathValueIn<T, P>;

  const firstKey = path.slice(0, firstSepIndex);
  const value = obj[firstKey];

  if (isObject(value)) {
    const updatedPath = path.replace(`${firstKey}${sep}`, '');
    return getValueByKeyPath(value, updatedPath) as KeyPathValueIn<T, P>;
  }

  return value as KeyPathValueIn<T, P>;
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
