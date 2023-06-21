import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileUpdateInput,
  DocFileUpdatePayload,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../../utils/helpers';
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
    const errors = validateContext(context, 'doc');

    if (!isValidContext(context, 'doc', errors))
      throw new CretadocAPIError('Cannot update doc file', errors);

    const validationErrors = await validateDocFileUpdateInput(
      input,
      context.loaders.doc.directory.byPath
    );

    const { contents, id, name, parentPath } = input;

    const maybeExistentDocFile = await context.loaders.doc.file.byId.load(id);

    if (!maybeExistentDocFile)
      validationErrors.id.push('The requested doc file id does not exist');

    if (hasValidationErrors(validationErrors))
      return { errors: validationErrors };

    const file = await context.mutators.doc.file.update({
      contents: contents ? sanitizeString(contents) : undefined,
      id,
      name,
      parentPath,
    });

    if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

    return { file: file ?? null };
  },
};
