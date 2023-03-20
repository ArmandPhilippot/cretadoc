import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileCreateInput,
  DocFileCreatePayload,
} from '../../../../types';
import {
  LoadersError,
  MutatorsError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { hasValidationErrors, sanitizeString } from '../../../../utils/helpers';
import { clearDocFileLoaders } from '../files.loaders';
import { validateDocFileCreateInput } from '../files.validators';
import {
  DocFileCreateInputType,
  DocFileCreateResultType,
} from './create.types';

export const fileCreate: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileCreateInput
> = {
  type: DocFileCreateResultType,
  description: 'Create a new documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileCreateInputType),
    },
  },
  resolve: async (
    _source,
    { input },
    context
  ): Promise<DocFileCreatePayload> => {
    if (!context.mutators?.doc)
      throw new MutatorsError(error.missing.mutator('Documentation'));

    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    const validationErrors = await validateDocFileCreateInput(
      input,
      context.loaders.doc.directory.byPath
    );
    const { contents, name, parentPath } = input;
    const existentDocFiles = await context.loaders.doc.file.list({
      first: 1,
      where: { name, path: parentPath },
    });

    if (existentDocFiles.total === 1)
      validationErrors.name.push(error.validation.existent('file'));

    if (hasValidationErrors(validationErrors))
      return {
        errors: validationErrors,
      };

    const docFile = await context.mutators.doc.file.create({
      contents: contents ? sanitizeString(contents) : undefined,
      name,
      parentPath,
    });

    if (docFile) clearDocFileLoaders(context.loaders.doc.file, { ...docFile });

    return { file: docFile ?? null };
  },
};
