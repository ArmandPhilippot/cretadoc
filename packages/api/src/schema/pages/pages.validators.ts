import { isString } from '@cretadoc/utils';
import type { PageCreate, ValidationErrors } from '../../types';
import { error } from '../../utils/errors/messages';
import {
  initValidationErrors,
  validateFilename,
} from '../../utils/helpers/validators';

/**
 * Validate a page content.
 *
 * @param {string} content - The content to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validatePageContent = (content: string): string[] => {
  const errors: string[] = [];

  if (!isString(content)) errors.push(error.invalid.type('string'));

  return errors;
};

/**
 * Validate a page name.
 *
 * @param {string} name - The name to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validatePageName = (name: string): string[] =>
  validateFilename(name);

/**
 * Validate the input to create a page.
 *
 * @param {T} input - The page data.
 * @returns {ValidationErrors<T>} The validation errors.
 */
export const validatePageCreateInput = <T extends PageCreate>(
  input: T
): ValidationErrors<T> => {
  const validationErrors = initValidationErrors(input);
  const { name, content } = input;

  if (content) validationErrors.content.push(...validatePageContent(content));
  validationErrors.name.push(...validatePageName(name));

  return validationErrors;
};
