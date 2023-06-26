import { isString } from '@cretadoc/utils';
import type {
  Meta,
  PageByIdLoader,
  PageByNameLoader,
  PageCreate,
  PageDelete,
  PageUpdate,
  ValidationErrors,
} from '../../types';
import { decodeBase64String, validateMetaKeyValue } from '../../utils/helpers';
import {
  initValidationErrors,
  validateFilename,
} from '../../utils/helpers/validators';

/**
 * Validate a page contents.
 *
 * @param {string} contents - The contents to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validatePageContents = (contents: string): string[] => {
  const errors: string[] = [];

  if (!isString(contents)) errors.push('Must be a string');

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

  if (!relativePath.startsWith('./')) errors.push('Invalid id');

  return errors;
};

/**
 * Validate the page meta.
 *
 * @param {Meta} meta - The meta to validate.
 * @returns {string[]} An array of errors or an empty array.
 */
export const validatePageMeta = (meta: Meta): string[] => {
  const errors: string[] = [];
  const metaEntries = Object.entries(meta) as Array<[keyof Meta, string]>;

  for (const [key, value] of metaEntries)
    errors.push(
      ...validateMetaKeyValue(key, value).map((err) => `${key}: ${err}`)
    );

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
  const { contents, meta, name } = input;

  if (contents)
    validationErrors.contents.push(...validatePageContents(contents));

  if (meta) validationErrors.meta.push(...validatePageMeta(meta));

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
  const { id, contents, meta, name } = input;

  validationErrors.id.push(...validatePageId(id));

  if (contents)
    validationErrors.contents.push(...validatePageContents(contents));

  if (meta) validationErrors.meta.push(...validatePageMeta(meta));

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

  if (!maybePage) errors.push('The requested page does not exist');

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
