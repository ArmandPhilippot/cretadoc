import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocDirectoryByIdLoader,
  DocDirectoryByPathLoader,
  DocDirectoryDeleteInput,
  DocDirectoryDeletePayload,
} from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
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
    const errors = validateContext(context, 'doc');

    if (!isValidContext(context, 'doc', errors))
      throw new CretadocAPIError('Cannot delete directory', errors);

    if (!input.id && !input.path)
      throw new UserInputError('Missing required argument', {
        expected: 'Either an id or a path',
      });

    if (input.id && input.path)
      throw new UserInputError('Too many arguments', {
        expected: 'Either an id or a path',
      });

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
