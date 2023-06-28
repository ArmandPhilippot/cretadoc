import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryUpdateInput,
  DocDirectoryUpdatePayload,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
import { clearDocDirectoryLoaders } from '../directories.loaders';
import { validateDocDirectoryUpdateInput } from '../directories.validators';

export const directoryUpdateResolver: GraphQLFieldResolver<
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

  const { id, name, parentPath } = input;

  const maybeExistentDir = await context.loaders.doc.directory.byId.load(id);

  if (!maybeExistentDir)
    validationErrors.id.push('The requested directory does not exist');

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const directory = await context.mutators.doc.directory.update({
    id,
    name,
    parentPath,
  });

  if (directory)
    clearDocDirectoryLoaders(context.loaders.doc.directory, { ...directory });

  return { directory: directory ?? null };
};
