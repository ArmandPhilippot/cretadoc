import { isString } from '@cretadoc/utils';
import type {
  DocDirectoryByPathLoader,
  DocFileByIdLoader,
  DocFileByPathLoader,
  DocFileCreate,
  DocFileDelete,
  DocFileUpdate,
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
 * Validate a documentation file content.
 *
 * @param {string} content - The content to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateDocFileContent = (content: string): string[] => {
  const errors: string[] = [];

  if (!isString(content)) errors.push(error.invalid.type('string'));

  return errors;
};

/**
 * Validate a documentation file id.
 *
 * @param {string} id - The id to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateDocFileId = (id: string): string[] => {
  const errors: string[] = [];
  const relativePath = decodeBase64String(id);

  if (!relativePath.startsWith('./')) errors.push(error.validation.format.id);

  return errors;
};

/**
 * Validate a documentation file name.
 *
 * @param {string} name - The name to validate.
 * @returns {string[]} An array of error messages or an empty array.
 */
export const validateDocFileName = (name: string): string[] =>
  validateFilename(name);

/**
 * Validate the parent path of a documentation file.
 *
 * @param {string} path - The path to validate.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
export const validateDocFileParentPath = async (
  path: string,
  loader: DocDirectoryByPathLoader
): Promise<string[]> => {
  const errors: string[] = [...validateRelativePath(path)];

  const maybeDir = await loader.load(path);

  if (!maybeDir) errors.push(error.validation.missing('directory'));

  return errors;
};

/**
 * Validate the input to create a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocFileCreateInput = async <T extends DocFileCreate>(
  input: T,
  loader: DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { name, content, parentPath } = input;

  validationErrors.name.push(...validateDocFileName(name));

  if (content)
    validationErrors.content.push(...validateDocFileContent(content));

  if (parentPath) {
    const parentPathErrors = await validateDocFileParentPath(
      parentPath,
      loader
    );
    validationErrors.parentPath.push(...parentPathErrors);
  }

  return validationErrors;
};

/**
 * Validate the input to update a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocFileUpdateInput = async <T extends DocFileUpdate>(
  input: T,
  loader: DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, content, name, parentPath } = input;

  validationErrors.id.push(...validateDocFileId(id));

  if (content)
    validationErrors.content.push(...validateDocFileContent(content));

  if (name) validationErrors.name.push(...validateDocFileName(name));

  if (parentPath) {
    const parentPathErrors = await validateDocFileParentPath(
      parentPath,
      loader
    );
    validationErrors.parentPath.push(...parentPathErrors);
  }

  return validationErrors;
};

type Validator = (str: string) => string[];

/**
 * Validate the value to delete a documentation file.
 *
 * @param {string} value - The value to delete a documentation file.
 * @param {DocFileByIdLoader | DocFileByPathLoader} loader - A method to load a documentation file.
 * @param {Validator} validator - A method to validate the value.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
const validateDocFileDeleteByIdOrByPath = async (
  value: string,
  loader: DocFileByIdLoader | DocFileByPathLoader,
  validator: Validator
): Promise<string[]> => {
  const errors: string[] = [];
  errors.push(...validator(value));

  const maybeDocFile = await loader.load(value);

  if (!maybeDocFile) errors.push(error.validation.missing('file'));

  return errors;
};

/**
 * Validate the input to delete a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {T} loader - A method to load a documentation file.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocFileDeleteInput = async <T extends DocFileDelete>(
  input: T,
  loader: DocFileByIdLoader | DocFileByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, path } = input;

  if (id)
    validationErrors.id.push(
      ...(await validateDocFileDeleteByIdOrByPath(
        id,
        loader,
        validateDocFileId
      ))
    );
  else if (path)
    validationErrors.path.push(
      ...(await validateDocFileDeleteByIdOrByPath(
        path,
        loader,
        validateRelativePath
      ))
    );

  return validationErrors;
};