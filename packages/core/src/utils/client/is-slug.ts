import type { Slug } from '@cretadoc/api';

/**
 * Check if the given string starts with a slash.
 *
 * @param {string} str - A string to check.
 * @returns {boolean} True if the given string is a slug.
 */
export const isSlug = (str: string): str is Slug => str.startsWith('/');
