import { isString } from './types';

/**
 * Convert a camel case string to a hyphenated string.
 *
 * @example camelCaseToHyphenated("camelCase") => "camel-case"
 *
 * @param str - A string.
 * @returns {string} The converted string.
 */
export const camelCaseToHyphenated = (str: string): string =>
  str.replace(/[A-Z]/g, (word) => `-${word.toLowerCase()}`);

/**
 * Convert a camel case string to a snake case string.
 *
 * @example camelToSnakeCase("camelCase") => "camel_case"
 *
 * @param str - A string.
 * @returns {string} The converted string.
 */
export const camelToSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (word) => `_${word.toLowerCase()}`);

/**
 * Convert a string into a slug.
 *
 * Adapted from https://gist.github.com/codeguy/6684588#gistcomment-3332719
 *
 * @param {string} str - A string.
 * @returns {string} The slug.
 */
export const slugify = (str: string): string => {
  if (!isString(str)) throw new Error('The argument must be a string.');

  return str
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/(?:^-)|(?:-$)/g, '');
};
