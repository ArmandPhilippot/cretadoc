import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileCreateInput,
  DocFileCreatePayload,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../../utils/helpers';
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
    const errors = validateContext(context, 'doc');

    if (!isValidContext(context, 'doc', errors))
      throw new CretadocAPIError('Cannot create file', errors);

    const validationErrors = await validateDocFileCreateInput(
      input,
      context.loaders.doc.directory.byPath
    );
    const { contents, meta, name, parentPath } = input;
    const existentDocFiles = await context.loaders.doc.file.list({
      first: 1,
      where: { name, path: parentPath },
    });

    if (existentDocFiles.total === 1)
      validationErrors.name.push(`File must be unique, ${name} already exists`);

    if (hasValidationErrors(validationErrors))
      return {
        errors: validationErrors,
      };

    const docFile = await context.mutators.doc.file.create({
      contents: contents ? sanitizeString(contents) : undefined,
      meta,
      name,
      parentPath,
    });

    if (docFile) clearDocFileLoaders(context.loaders.doc.file, { ...docFile });

    return { file: docFile ?? null };
  },
};
