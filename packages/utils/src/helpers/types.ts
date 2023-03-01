/**
 * Check if a value is a boolean.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is a boolean.
 */
export const isBoolean = (value: unknown): value is boolean =>
  value === true || value === false;

/**
 * Check if a value is `null`.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is `null`.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Check if a value is a number.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is a number.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

/**
 * Check if a value is an object.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is an object.
 */
export const isObject = (
  value: unknown
): value is Record<string | number | symbol, unknown> =>
  value !== null && value instanceof Object && !Array.isArray(value);

/**
 * Check if a value is a string.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is a string.
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

/**
 * Check if a value is `undefined`.
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is `undefined`.
 */
export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;
