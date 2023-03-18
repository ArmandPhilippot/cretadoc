import type {
  DocDirectoryByPathLoader,
  DocDirectoryCreate,
  DocDirectoryUpdate,
  ValidationErrors,
} from '../../../types';
import { error } from '../../../utils/errors/messages';
import { decodeBase64String } from '../../../utils/helpers';
import {
  initValidationErrors,
  validateFilename,
  validateRelativePath,
} from '../../../utils/helpers/validators';

/**
 * Validate a documentation directory id.
 *
 * @param {string} id - The id to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateDocDirectoryId = (id: string): string[] => {
  const errors: string[] = [];
  const relativePath = decodeBase64String(id);

  if (!relativePath.startsWith('./')) errors.push(error.validation.format.id);

  return errors;
};

/**
 * Validate a documentation directory name.
 *
 * @param {string} name - The name to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateDocDirectoryName = (name: string): string[] =>
  validateFilename(name);

/**
 * Validate the parent path of a documentation directory.
 *
 * @param {string} path - The path to validate.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
export const validateDocDirectoryParentPath = async (
  path: string,
  loader: DocDirectoryByPathLoader
): Promise<string[]> => {
  const errors: string[] = [...validateRelativePath(path)];

  const maybeDir = await loader.load(path);

  if (!maybeDir) errors.push(error.validation.missing('directory'));

  return errors;
};

/**
 * Validate the input to create a documentation directory.
 *
 * @param {T} input - The documentation directory data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocDirectoryCreateInput = async <
  T extends DocDirectoryCreate
>(
  input: T,
  loader: DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { name, parentPath } = input;

  validationErrors.name.push(...validateDocDirectoryName(name));

  if (parentPath) {
    const parentPathErrors = await validateDocDirectoryParentPath(
      parentPath,
      loader
    );
    validationErrors.parentPath.push(...parentPathErrors);
  }

  return validationErrors;
};

/**
 * Validate the input to update a documentation directory.
 *
 * @param {T} input - The documentation directory data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocDirectoryUpdateInput = async <
  T extends DocDirectoryUpdate
>(
  input: T,
  loader: DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, name, parentPath } = input;

  validationErrors.id.push(...validateDocDirectoryId(id));

  if (name) validationErrors.name.push(...validateDocDirectoryName(name));

  if (parentPath) {
    const parentPathErrors = await validateDocDirectoryParentPath(
      parentPath,
      loader
    );
    validationErrors.parentPath.push(...parentPathErrors);
  }

  return validationErrors;
};
