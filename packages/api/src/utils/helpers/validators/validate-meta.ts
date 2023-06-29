import type { Meta } from '../../../types';
import { validateDateTime } from './validate-dates';
import { validateString } from './validate-strings';

/**
 * Validate the status of file.
 *
 * @param {string} status - The status to validate.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateFileStatus = (status: string): string[] => {
  const errors: string[] = [];
  const validStatus = ['draft', 'published'];

  if (!validStatus.includes(status))
    errors.push(`Invalid status, should be one of ${validStatus.join(', ')}`);

  return errors;
};

/**
 * Validate a meta key/value pair.
 *
 * @param {keyof Meta} key - The meta key.
 * @param {string} value - The meta value.
 * @returns {string[]} An empty array or an array of errors.
 */
export const validateMetaKeyValue = (
  key: keyof Meta,
  value: string
): string[] => {
  switch (key) {
    case 'createdAt':
    case 'updatedAt':
      return validateDateTime(value);
    case 'seoDescription':
    case 'seoTitle':
      return validateString(value, { lengthRange: { min: 0 } });
    case 'status':
      return validateFileStatus(value);
    case 'title':
    default:
      return validateString(value, { lengthRange: { min: 0, max: 150 } });
  }
};

/**
 * Validate the frontmatter meta.
 *
 * @param {Meta} meta - The meta to validate.
 * @returns {string[]} An array of errors or an empty array.
 */
export const validateFrontMatterMeta = (meta: Meta): string[] => {
  const errors: string[] = [];
  const metaEntries = Object.entries(meta) as Array<[keyof Meta, string]>;

  for (const [key, value] of metaEntries)
    errors.push(
      ...validateMetaKeyValue(key, value).map((err) => `${key}: ${err}`)
    );

  return errors;
};
