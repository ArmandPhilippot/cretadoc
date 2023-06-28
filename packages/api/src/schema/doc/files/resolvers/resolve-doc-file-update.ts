import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocFileUpdateInput,
  DocFileUpdatePayload,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../../utils/helpers';
import { clearDocFileLoaders } from '../files.loaders';
import { validateDocFileUpdateInput } from '../files.validators';

export const resolveDocFileUpdate: GraphQLFieldResolver<
  null,
  APIContext,
  DocFileUpdateInput
> = async (_, { input }, context): Promise<DocFileUpdatePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot update doc file', errors);

  const validationErrors = await validateDocFileUpdateInput(
    input,
    context.loaders.doc.directory.byPath
  );

  const { contents, id, meta, name, parentPath } = input;

  const maybeExistentDocFile = await context.loaders.doc.file.byId.load(id);

  if (!maybeExistentDocFile)
    validationErrors.id.push('The requested doc file id does not exist');

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const file = await context.mutators.doc.file.update({
    contents: contents ? sanitizeString(contents) : undefined,
    id,
    meta,
    name,
    parentPath,
  });

  if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

  return { file: file ?? null };
};
