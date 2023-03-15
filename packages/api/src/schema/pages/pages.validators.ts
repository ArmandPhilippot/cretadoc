import { isString } from '@cretadoc/utils';
import type { PageCreate, PageUpdate, ValidationErrors } from '../../types';
import { error } from '../../utils/errors/messages';
import { decodeBase64String } from '../../utils/helpers';
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
 * Validate a page id.
 *
 * @param {string} id - The id to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validatePageId = (id: string): string[] => {
  const errors: string[] = [];
  const relativePath = decodeBase64String(id);

  if (!relativePath.startsWith('./')) errors.push(error.validation.format.id);

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

/**
 * Validate the input to update a page.
 *
 * @param {T} input - The page data.
 * @returns {ValidationErrors<T>} The validation errors.
 */
export const validatePageUpdateInput = <T extends PageUpdate>(
  input: T
): ValidationErrors<T> => {
  const validationErrors = initValidationErrors(input);
  const { id, content, name } = input;

  validationErrors.id.push(...validatePageId(id));
  if (content) validationErrors.content.push(...validatePageContent(content));
  if (name) validationErrors.name.push(...validatePageName(name));

  return validationErrors;
};
