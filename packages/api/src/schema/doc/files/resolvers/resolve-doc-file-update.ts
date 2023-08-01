import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryByPathLoader,
  DocFileUpdate,
  DocFileUpdateInput,
  DocFileUpdatePayload,
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
  validateFileId,
  validateFilename,
  validateFrontMatterMeta,
  validateParentPath,
} from '../../../../utils/helpers/validators';
import { clearDocFileLoaders } from '../files.loaders';

/**
 * Validate the input to update a documentation file.
 *
 * @param {T} input - The documentation file data.
 * @param {DocDirectoryByPathLoader} loader - A directory loader.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
const validateDocFileUpdateInput = async <T extends DocFileUpdate>(
  input: T,
  loader: DocDirectoryByPathLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, contents, excerpt, meta, name, parentPath } = input;

  validationErrors.id.push(...validateFileId(id));

  if (contents)
    validationErrors.contents.push(...validateFileContents(contents));

  if (excerpt) validationErrors.excerpt.push(...validateFileContents(excerpt));

  if (name) validationErrors.name.push(...validateFilename(name));

  if (meta) validationErrors.meta.push(...validateFrontMatterMeta(meta));

  if (parentPath)
    validationErrors.parentPath.push(
      ...(await validateParentPath(parentPath, loader))
    );

  return validationErrors;
};

/**
 * Resolve a docFileUpdate mutation.
 *
 * @param {null} _parent - The query parent.
 * @param {DocFileUpdateInput} input - The input to update a doc file.
 * @param {APIContext} context - The API context.
 * @returns {Promise<DocFileUpdatePayload>} The payload.
 */
export const resolveDocFileUpdate: GraphQLFieldResolver<
  null,
  APIContext,
  DocFileUpdateInput
> = async (_parent, { input }, context): Promise<DocFileUpdatePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot update doc file', errors);

  const validationErrors = await validateDocFileUpdateInput(
    input,
    context.loaders.doc.directory.byPath
  );

  const { contents, excerpt, id, meta, name, parentPath } = input;

  const maybeExistentDocFile = await context.loaders.doc.file.byId.load(id);

  if (!maybeExistentDocFile)
    validationErrors.id.push('The requested doc file id does not exist');

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const file = await context.mutators.doc.file.update({
    contents: contents ? sanitizeString(contents) : undefined,
    excerpt: excerpt ? sanitizeString(excerpt) : undefined,
    id,
    meta,
    name,
    parentPath,
  });

  if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

  return { file: file ?? null };
};
