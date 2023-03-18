import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileByIdLoader,
  DocFileByPathLoader,
  DocFileDeleteInput,
  DocFileDeletePayload,
} from '../../../../types';
import {
  InputValidationError,
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors } from '../../../../utils/helpers';
import { clearDocFileLoaders } from '../files.loaders';
import { validateDocFileDeleteInput } from '../files.validators';
import {
  DocFileDeleteInputType,
  DocFileDeleteResultType,
} from './delete.types';

export const fileDelete: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileDeleteInput
> = {
  type: DocFileDeleteResultType,
  description: 'Delete an existing documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileDeleteInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocFileDeletePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    if (!input.id && !input.path)
      throw new InputValidationError(error.missing.input, ['id', 'path']);

    if (input.id && input.path)
      throw new InputValidationError(error.invalid.input, ['id', 'path']);

    const loader: DocFileByIdLoader | DocFileByPathLoader = input.id
      ? context.loaders.doc.file.byId
      : context.loaders.doc.file.byPath;
    const validationErrors = await validateDocFileDeleteInput(input, loader);

    if (hasValidationErrors(validationErrors))
      return { errors: validationErrors };

    const file = await context.mutators.doc.file.del(input);

    if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

    return { file: file ?? null };
  },
};
