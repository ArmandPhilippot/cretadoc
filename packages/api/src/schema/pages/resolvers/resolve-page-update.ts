import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageUpdateInput,
  PageUpdatePayload,
} from '../../../types';
import { CretadocAPIError } from '../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../utils/helpers';
import { clearPageLoaders } from '../pages.loaders';
import { validatePageUpdateInput } from '../pages.validators';

export const resolvePageUpdate: GraphQLFieldResolver<
  null,
  APIContext,
  PageUpdateInput
> = async (_, { input }, context): Promise<PageUpdatePayload> => {
  const errors = validateContext(context, 'page');

  if (!isValidContext(context, 'page', errors))
    throw new CretadocAPIError('Cannot update page', errors);

  const validationErrors = validatePageUpdateInput(input);

  const { contents, id, meta, name } = input;

  const maybeExistentPage = await context.loaders.page.byId.load(id);

  if (!maybeExistentPage)
    validationErrors.id.push('The requested page id does not exist');

  if (hasValidationErrors(validationErrors))
    return { errors: validationErrors };

  const page = await context.mutators.page.update({
    contents: contents ? sanitizeString(contents) : undefined,
    id,
    meta,
    name,
  });

  if (page) clearPageLoaders(context.loaders.page, { ...page });

  return { page: page ?? null };
};
