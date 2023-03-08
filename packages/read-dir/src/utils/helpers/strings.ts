/**
 * Transform a path to a buffer.
 *
 * @param {string} path - A path.
 * @returns {string} An id.
 */
export const generateIdFrom = (path: string): string =>
  Buffer.from(path).toString('base64');
