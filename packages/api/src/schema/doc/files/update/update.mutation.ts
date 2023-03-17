import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileUpdateInput,
  DocFileUpdatePayload,
} from '../../../../types';
import {
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors, sanitizeString } from '../../../../utils/helpers';
import { clearDocFileLoaders } from '../files.loaders';
import { validateDocFileUpdateInput } from '../files.validators';
import {
  DocFileUpdateInputType,
  DocFileUpdateResultType,
} from './update.types';

export const fileUpdate: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileUpdateInput
> = {
  type: DocFileUpdateResultType,
  description: 'Update an existing documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileUpdateInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocFileUpdatePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    const validationErrors = await validateDocFileUpdateInput(
      input,
      context.loaders.doc.directory.byPath
    );

    const { content, id, name } = input;

    const maybeExistentDocFile = await context.loaders.doc.file.byId.load(id);

    if (!maybeExistentDocFile)
      validationErrors.id.push(error.validation.missing('file'));

    if (hasValidationErrors(validationErrors))
      return { errors: validationErrors };

    const file = await context.mutators.doc.file.update({
      content: content ? sanitizeString(content) : undefined,
      id,
      name,
    });

    if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

    return { file: file ?? null };
  },
};
