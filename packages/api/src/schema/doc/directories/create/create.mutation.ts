import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocDirectoryCreateInput,
  DocDirectoryCreatePayload,
} from '../../../../types';
import {
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors } from '../../../../utils/helpers';
import { clearDocDirectoryLoaders } from '../directories.loaders';
import { validateDocDirectoryCreateInput } from '../directories.validators';
import {
  DocDirectoryCreateInputType,
  DocDirectoryCreateResultType,
} from './create.types';

export const directoryCreate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryCreateInput
> = {
  type: DocDirectoryCreateResultType,
  description: 'Create a new documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryCreateInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocDirectoryCreatePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

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
      validationErrors.name.push(error.validation.existent('directory'));

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
  },
};
