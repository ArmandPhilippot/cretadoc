import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryByPathLoader,
  DocFileCreate,
  DocFileCreateInput,
  DocFileCreatePayload,
  ValidationErrors,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  initValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../../utils/helpers';
import {
  validateFileContents,
  validateFilename,
  validateFrontMatterMeta,
  validateParentPath,
} from '../../../../utils/helpers/validators';
import { clearDocFileLoaders } from '../files.loaders';

/**
 * Validate the input to create a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
const validateDocFileCreateInput = async <T extends DocFileCreate>(
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

/**
 * Resolve a docFileCreate mutation.
 *
 * @param {null} _parent - The query parent.
 * @param {DocFileCreateInput} input - The input to create a doc file.
 * @param {APIContext} context - The API context.
 * @returns {Promise<DocFileCreatePayload>} The payload.
 */
export const resolveDocFileCreate: GraphQLFieldResolver<
  null,
  APIContext,
  DocFileCreateInput
> = async (_parent, { input }, context): Promise<DocFileCreatePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot create file', errors);

  const validationErrors = await validateDocFileCreateInput(
    input,
    context.loaders.doc.directory.byPath
  );
  const { contents, excerpt, meta, name, parentPath } = input;
  const existentDocFiles = await context.loaders.doc.file.list({
    where: { name, path: parentPath },
  });

  if (existentDocFiles.length)
    validationErrors.name.push(`File must be unique, ${name} already exists`);

  if (hasValidationErrors(validationErrors))
    return {
      errors: validationErrors,
    };

  const docFile = await context.mutators.doc.file.create({
    contents: contents ? sanitizeString(contents) : undefined,
    excerpt: excerpt ? sanitizeString(excerpt) : undefined,
    meta,
    name,
    parentPath,
  });

  if (docFile) clearDocFileLoaders(context.loaders.doc.file, { ...docFile });

  return { file: docFile ?? null };
};
