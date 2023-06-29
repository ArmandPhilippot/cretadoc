import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocFileByIdLoader,
  DocFileByPathLoader,
  DocFileDelete,
  DocFileDeleteInput,
  DocFileDeletePayload,
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
import { clearDocFileLoaders } from '../files.loaders';

/**
 * Validate the value to delete a documentation file.
 *
 * @param {string} value - The value to delete a documentation file.
 * @param {DocFileByIdLoader | DocFileByPathLoader} loader - A doc file loader.
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

  if (!maybeDocFile) errors.push('The requested file does not exist');

  return errors;
};

/**
 * Validate the input to delete a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {T} loader - A method to load a documentation file.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
const validateDocFileDeleteInput = async <T extends DocFileDelete>(
  input: T,
  loader: DocFileByIdLoader | DocFileByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, path } = input;

  if (id)
    validationErrors.id.push(
      ...(await validateDocFileDeleteByIdOrByPath(id, loader, validateFileId))
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

/**
 * Resolve a docFileDelete mutation.
 *
 * @param {null} _parent - The query parent.
 * @param {DocFileDeleteInput} input - The input to delete a doc file.
 * @param {APIContext} context - The API context.
 * @returns {Promise<DocFileDeletePayload>} The payload.
 */
export const resolveDocFileDelete: GraphQLFieldResolver<
  null,
  APIContext,
  DocFileDeleteInput
> = async (_parent, { input }, context): Promise<DocFileDeletePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot delete file', errors);

  if (!input.id && !input.path)
    throw new UserInputError('Missing required argument', {
      expected: 'Either an id or a path',
    });

  if (input.id && input.path)
    throw new UserInputError('Too many arguments', {
      expected: 'Either an id or a path',
    });

  const loader: DocFileByIdLoader | DocFileByPathLoader = input.id
    ? context.loaders.doc.file.byId
    : context.loaders.doc.file.byPath;
  const validationErrors = await validateDocFileDeleteInput(input, loader);

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const file = await context.mutators.doc.file.del(input);

  if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

  return { file: file ?? null };
};
