import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocDirectoryByIdLoader,
  DocDirectoryByPathLoader,
  DocDirectoryDeleteInput,
  DocDirectoryDeletePayload,
} from '../../../../types';
import {
  InputValidationError,
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors } from '../../../../utils/helpers';
import { clearDocDirectoryLoaders } from '../directories.loaders';
import { validateDocDirectoryDeleteInput } from '../directories.validators';
import {
  DocDirectoryDeleteInputType,
  DocDirectoryDeleteResultType,
} from './delete.types';

export const directoryDelete: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryDeleteInput
> = {
  type: DocDirectoryDeleteResultType,
  description: 'Delete an existing documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryDeleteInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocDirectoryDeletePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    if (!input.id && !input.path)
      throw new InputValidationError(error.missing.input, ['id', 'path']);

    if (input.id && input.path)
      throw new InputValidationError(error.invalid.input, ['id', 'path']);

    const loader: DocDirectoryByIdLoader | DocDirectoryByPathLoader = input.id
      ? context.loaders.doc.directory.byId
      : context.loaders.doc.directory.byPath;
    const validationErrors = await validateDocDirectoryDeleteInput(
      input,
      loader
    );

    if (hasValidationErrors(validationErrors))
      return { errors: validationErrors };

    const directory = await context.mutators.doc.directory.del(input);

    if (directory)
      clearDocDirectoryLoaders(context.loaders.doc.directory, { ...directory });

    return { directory: directory ?? null };
  },
};
