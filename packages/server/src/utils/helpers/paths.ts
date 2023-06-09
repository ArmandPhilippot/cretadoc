import { join } from 'path';

/**
 * Retrieve a file path from a given entrypoint and a path.
 *
 * It concatenates the base path with entrypoint if needed.
 *
 * @param {string} entrypoint - An entrypoint path or a filename.
 * @param {string} path - A base path.
 * @returns {string} The absolute file path.
 */
export const getFilePathFrom = (entrypoint: string, path: string): string => {
  if (entrypoint.startsWith(path)) return entrypoint;
  return join(path, entrypoint);
};
