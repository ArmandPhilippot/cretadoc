import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectory,
  DocDirectoryByIdLoader,
  DocDirectoryByPathLoader,
  DocDirectoryDelete,
  DocDirectoryDeleteInput,
  DocDirectoryDeletePayload,
  ValidationErrors,
  Validator,
} from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  initValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
import {
  validateFileId,
  validateRelativePath,
} from '../../../../utils/helpers/validators';
import { clearDocDirectoryLoaders } from '../directories.loaders';

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

  const docDirectory = await loader.load(value);

  if (!docDirectory) errors.push('The requested directory does not exist');
  else if (mustBeEmpty && !!docDirectory.contents?.edges.length)
    errors.push('The directory must be empty');

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
        validator: validateFileId,
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

export const resolveDocDirectoryDelete: GraphQLFieldResolver<
  null,
  APIContext,
  DocDirectoryDeleteInput
> = async (_, { input }, context): Promise<DocDirectoryDeletePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot delete directory', errors);

  if (!input.id && !input.path)
    throw new UserInputError('Missing required argument', {
      expected: 'Either an id or a path',
    });

  if (input.id && input.path)
    throw new UserInputError('Too many arguments', {
      expected: 'Either an id or a path',
    });

  const loader: DocDirectoryByIdLoader | DocDirectoryByPathLoader = input.id
    ? context.loaders.doc.directory.byId
    : context.loaders.doc.directory.byPath;
  const validationErrors = await validateDocDirectoryDeleteInput(input, loader);

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const directory = await context.mutators.doc.directory.del(input);

  if (directory)
    clearDocDirectoryLoaders(context.loaders.doc.directory, { ...directory });

  return { directory: directory ?? null };
};
