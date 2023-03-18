import type {
  DocDirectory,
  DocDirectoryByIdLoader,
  DocDirectoryByPathLoader,
  DocDirectoryCreate,
  DocDirectoryDelete,
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

/**
 * Check if a documentation directory is empty.
 *
 * @param {DocDirectory} dir - A documentation directory.
 * @returns {boolean} True if it is empty.
 */
const isDirectoryEmpty = (dir: DocDirectory): boolean => {
  const hasSubDir = !!dir.content?.directories.length;
  const hasFiles = !!dir.content?.files.length;

  return !hasFiles && !hasSubDir;
};

type Validator<T> = (value: T) => string[];

type ValidateDocDirectoryDeleteConfig<
  L extends DocDirectoryByIdLoader | DocDirectoryByPathLoader,
  V = L extends DocDirectoryByIdLoader
    ? DocDirectory['id']
    : DocDirectory['path']
> = {
  /**
   * A directory loader.
   */
  loader: L;
  /**
   * Add a check for the directory contents.
   */
  mustBeEmpty: boolean;
  /**
   * A validator for the value.
   */
  validator: Validator<V>;
  /**
   * The value to validate.
   */
  value: V;
};

/**
 * Validate the value to delete a documentation directory.
 *
 * @param {ValidateDocDirectoryDeleteConfig} config - The validation config.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
const validateDocDirectoryToDelete = async <
  L extends DocDirectoryByIdLoader | DocDirectoryByPathLoader
>({
  loader,
  mustBeEmpty,
  validator,
  value,
}: ValidateDocDirectoryDeleteConfig<L>): Promise<string[]> => {
  const errors: string[] = [];
  errors.push(...validator(value));

  const maybeDocDirectory = await loader.load(value);

  if (maybeDocDirectory && mustBeEmpty && !isDirectoryEmpty(maybeDocDirectory))
    errors.push(error.validation.directory.contents);
  else if (!maybeDocDirectory)
    errors.push(error.validation.missing('directory'));

  return errors;
};

/**
 * Validate the input to delete a documentation directory.
 *
 * @param {T} input - The documentation directory data.
 * @param {T} loader - A method to load a documentation directory.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
export const validateDocDirectoryDeleteInput = async <
  T extends DocDirectoryDelete
>(
  input: T,
  loader: DocDirectoryByIdLoader | DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, path, onlyEmpty = true } = input;

  if (id)
    validationErrors.id.push(
      ...(await validateDocDirectoryToDelete({
        loader,
        mustBeEmpty: onlyEmpty,
        validator: validateDocDirectoryId,
        value: id,
      }))
    );
  else if (path)
    validationErrors.path.push(
      ...(await validateDocDirectoryToDelete({
        loader,
        mustBeEmpty: onlyEmpty,
        validator: validateRelativePath,
        value: path,
      }))
    );

  return validationErrors;
};
