import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryByPathLoader,
  DocDirectoryCreate,
  DocDirectoryCreateInput,
  DocDirectoryCreatePayload,
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
  validateFilename,
  validateFrontMatterMeta,
  validateParentPath,
} from '../../../../utils/helpers/validators';
import { clearDocDirectoryLoaders } from '../directories.loaders';

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
  const { contents, excerpt, meta, name, parentPath } = input;

  validationErrors.name.push(...validateFilename(name));

  if (contents)
    validationErrors.contents.push(...validateFileContents(contents));

  if (excerpt) validationErrors.excerpt.push(...validateFileContents(excerpt));

  if (meta) validationErrors.meta.push(...validateFrontMatterMeta(meta));

  if (parentPath)
    validationErrors.parentPath.push(
      ...(await validateParentPath(parentPath, loader))
    );

  return validationErrors;
};

export const resolveDocDirectoryCreate: GraphQLFieldResolver<
  null,
  APIContext,
  DocDirectoryCreateInput
> = async (_, { input }, context): Promise<DocDirectoryCreatePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot create directory', errors);

  const validationErrors = await validateDocDirectoryCreateInput(
    input,
    context.loaders.doc.directory.byPath
  );
  const { contents, excerpt, meta, name, parentPath } = input;
  const existentDocDirectories = await context.loaders.doc.directory.list({
    where: { name, path: parentPath },
  });

  if (existentDocDirectories.length)
    validationErrors.name.push(
      `Directory name must be unique, ${name} already exist`
    );

  if (hasValidationErrors(validationErrors))
    return {
      errors: validationErrors,
    };

  const docDirectory = await context.mutators.doc.directory.create({
    contents,
    excerpt,
    meta,
    name,
    parentPath,
  });

  if (docDirectory)
    clearDocDirectoryLoaders(context.loaders.doc.directory, {
      ...docDirectory,
    });

  return { directory: docDirectory ?? null };
};
