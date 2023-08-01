import { type PAGINATED_SLUG_PREFIX, PAGINATION_REGEX } from '../constants';

/**
 * Check if the given path matches the `PAGINATION_REGEX`.
 *
 * @param {string} path - The path.
 * @returns {boolean} True if it is a paginated path.
 */
export const isPaginated = (
  path: string
): path is `${string}${typeof PAGINATED_SLUG_PREFIX}/${number}` =>
  !!PAGINATION_REGEX.exec(path);
