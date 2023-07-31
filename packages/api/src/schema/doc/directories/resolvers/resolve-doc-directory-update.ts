import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryByPathLoader,
  DocDirectoryUpdate,
  DocDirectoryUpdateInput,
  DocDirectoryUpdatePayload,
  ValidationErrors,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  initValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
import {
  validateFileContents,
  validateFileId,
  validateFilename,
  validateFrontMatterMeta,
  validateParentPath,
} from '../../../../utils/helpers/validators';
import { clearDocDirectoryLoaders } from '../directories.loaders';

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
  const { contents, id, meta, name, parentPath } = input;

  validationErrors.id.push(...validateFileId(id));

  if (contents)
    validationErrors.contents.push(...validateFileContents(contents));

  if (meta) validationErrors.meta.push(...validateFrontMatterMeta(meta));

  if (name) validationErrors.name.push(...validateFilename(name));

  if (parentPath)
    validationErrors.parentPath.push(
      ...(await validateParentPath(parentPath, loader))
    );

  return validationErrors;
};

export const resolveDocDirectoryUpdate: GraphQLFieldResolver<
  null,
  APIContext,
  DocDirectoryUpdateInput
> = async (_, { input }, context): Promise<DocDirectoryUpdatePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot update directory', errors);

  const validationErrors = await validateDocDirectoryUpdateInput(
    input,
    context.loaders.doc.directory.byPath
  );

  const { id, meta, name, parentPath } = input;

  const maybeExistentDir = await context.loaders.doc.directory.byId.load(id);

  if (!maybeExistentDir)
    validationErrors.id.push('The requested directory does not exist');

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const directory = await context.mutators.doc.directory.update({
    id,
    meta,
    name,
    parentPath,
  });

  if (directory)
    clearDocDirectoryLoaders(context.loaders.doc.directory, { ...directory });

  return { directory: directory ?? null };
};
