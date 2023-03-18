import { isString } from '@cretadoc/utils';
import type {
  PageByIdLoader,
  PageByNameLoader,
  PageCreate,
  PageDelete,
  PageUpdate,
  ValidationErrors,
} from '../../types';
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

type Validator = (str: string) => string[];

/**
 * Validate the value to delete a page.
 *
 * @param {string} value - The value to delete a page.
 * @param {PageByIdLoader | PageByNameLoader} loader - A method to load a page.
 * @param {Validator} validator - A method to validate the value.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
const validatePageDeleteByIdOrByName = async (
  value: string,
  loader: PageByIdLoader | PageByNameLoader,
  validator: Validator
): Promise<string[]> => {
  const errors: string[] = [];
  errors.push(...validator(value));

  const maybePage = await loader.load(value);

  if (!maybePage) errors.push(error.validation.missing('page'));

  return errors;
};

/**
 * Validate the input to delete a page.
 *
 * @param {T} input - The page data.
 * @param {T} loader - A method to load a page.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validatePageDeleteInput = async <T extends PageDelete>(
  input: T,
  loader: PageByIdLoader | PageByNameLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, name } = input;

  if (id)
    validationErrors.id.push(
      ...(await validatePageDeleteByIdOrByName(id, loader, validatePageId))
    );
  else if (name)
    validationErrors.name.push(
      ...(await validatePageDeleteByIdOrByName(name, loader, validatePageName))
    );

  return validationErrors;
};