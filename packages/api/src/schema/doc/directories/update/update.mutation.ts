import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocDirectoryUpdateInput,
  DocDirectoryUpdatePayload,
} from '../../../../types';
import {
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors } from '../../../../utils/helpers';
import { clearDocDirectoryLoaders } from '../directories.loaders';
import { validateDocDirectoryUpdateInput } from '../directories.validators';
import {
  DocDirectoryUpdateInputType,
  DocDirectoryUpdateResultType,
} from './update.types';

export const directoryUpdate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryUpdateInput
> = {
  type: DocDirectoryUpdateResultType,
  description: 'Update an existing documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryUpdateInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocDirectoryUpdatePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    const validationErrors = await validateDocDirectoryUpdateInput(
      input,
      context.loaders.doc.directory.byPath
    );

    const { id, name, parentPath } = input;

    const maybeExistentDir = await context.loaders.doc.directory.byId.load(id);

    if (!maybeExistentDir)
      validationErrors.id.push(error.validation.missing('directory'));

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
  },
};
