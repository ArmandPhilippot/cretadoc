import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  DocFileByIdLoader,
  DocFileByPathLoader,
  DocFileDeleteInput,
  DocFileDeletePayload,
} from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  validateContext,
} from '../../../../utils/helpers';
import { clearDocFileLoaders } from '../files.loaders';
import { validateDocFileDeleteInput } from '../files.validators';

export const fileDeleteResolver: GraphQLFieldResolver<
  null,
  APIContext,
  DocFileDeleteInput
> = async (_, { input }, context): Promise<DocFileDeletePayload> => {
  const errors = validateContext(context, 'doc');

  if (!isValidContext(context, 'doc', errors))
    throw new CretadocAPIError('Cannot delete file', errors);

  if (!input.id && !input.path)
    throw new UserInputError('Missing required argument', {
      expected: 'Either an id or a path',
    });

  if (input.id && input.path)
    throw new UserInputError('Too many arguments', {
      expected: 'Either an id or a path',
    });

  const loader: DocFileByIdLoader | DocFileByPathLoader = input.id
    ? context.loaders.doc.file.byId
    : context.loaders.doc.file.byPath;
  const validationErrors = await validateDocFileDeleteInput(input, loader);

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const file = await context.mutators.doc.file.del(input);

  if (file) clearDocFileLoaders(context.loaders.doc.file, { ...file });

  return { file: file ?? null };
};
