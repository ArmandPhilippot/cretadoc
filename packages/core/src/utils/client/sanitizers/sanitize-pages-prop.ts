import type { Nullable } from '@cretadoc/utils';
import type { CretadocPages } from '../../../types';
import { MARKDOWN_EXT } from '../../constants';

/**
 * Remove the markdown extension from a filename.
 *
 * @param {string} filename - A filename
 * @returns {string} The filename without extension.
 */
const removeMarkdownExtension = (filename: string): string =>
  filename.replace(new RegExp(`${MARKDOWN_EXT}$`), '');

/**
 * Sanitize the pages configuration.
 *
 * It removes the markdown extension of each filename if it is specified by
 * the consumer.
 *
 * @param pages - The pages configuration.
 * @returns {CretadocPages} The sanitized config.
 */
export const sanitizePagesProp = (pages: CretadocPages): CretadocPages => {
  const sanitizedPages: Array<[string, Nullable<string>]> = Object.entries(
    pages
  ).map(([key, value]) => [
    key,
    value?.endsWith(MARKDOWN_EXT) ? removeMarkdownExtension(value) : value,
  ]);

  return Object.fromEntries(sanitizedPages) as CretadocPages;
};
