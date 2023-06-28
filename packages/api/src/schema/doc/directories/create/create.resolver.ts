import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocDirectoryCreateInput,
  DocDirectoryCreatePayload,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
import { clearDocDirectoryLoaders } from '../directories.loaders';
import { validateDocDirectoryCreateInput } from '../directories.validators';

export const directoryCreateResolver: GraphQLFieldResolver<
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
  const { name, parentPath } = input;
  const existentDocDirectories = await context.loaders.doc.directory.list({
    first: 1,
    where: { name, path: parentPath },
  });

  if (existentDocDirectories.total === 1)
    validationErrors.name.push(
      `Directory name must be unique, ${name} already exist`
    );

  if (hasValidationErrors(validationErrors))
    return {
      errors: validationErrors,
    };

  const docDirectory = await context.mutators.doc.directory.create({
    name,
    parentPath,
  });

  if (docDirectory)
    clearDocDirectoryLoaders(context.loaders.doc.directory, {
      ...docDirectory,
    });

  return { directory: docDirectory ?? null };
};
