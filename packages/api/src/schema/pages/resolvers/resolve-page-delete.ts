import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageByIdLoader,
  PageByNameLoader,
  PageDeleteInput,
  PageDeletePayload,
} from '../../../types';
import { CretadocAPIError, UserInputError } from '../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  validateContext,
} from '../../../utils/helpers';
import { clearPageLoaders } from '../pages.loaders';
import { validatePageDeleteInput } from '../pages.validators';

export const resolvePageDelete: GraphQLFieldResolver<
  null,
  APIContext,
  PageDeleteInput
> = async (_, { input }, context): Promise<PageDeletePayload> => {
  const errors = validateContext(context, 'page');

  if (!isValidContext(context, 'page', errors))
    throw new CretadocAPIError('Cannot delete page', errors);

  if (!input.id && !input.name)
    throw new UserInputError('Missing required argument', {
      expected: 'Either an id or a name',
    });

  if (input.id && input.name)
    throw new UserInputError('Too many arguments', {
      expected: 'Either an id or a name',
    });

  const loader: PageByIdLoader | PageByNameLoader = input.id
    ? context.loaders.page.byId
    : context.loaders.page.byName;
  const validationErrors = await validatePageDeleteInput(input, loader);

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const page = await context.mutators.page.del(input);

  if (page) clearPageLoaders(context.loaders.page, { ...page });

  return { page: page ?? null };
};
