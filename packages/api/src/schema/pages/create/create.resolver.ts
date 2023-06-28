import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageCreateInput,
  PageCreatePayload,
} from '../../../types';
import { CretadocAPIError } from '../../../utils/exceptions';
import {
  hasValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../utils/helpers';
import { clearPageLoaders } from '../pages.loaders';
import { validatePageCreateInput } from '../pages.validators';

export const pageCreateResolver: GraphQLFieldResolver<
  null,
  APIContext,
  PageCreateInput
> = async (_, { input }, context): Promise<PageCreatePayload> => {
  const errors = validateContext(context, 'page');

  if (!isValidContext(context, 'page', errors))
    throw new CretadocAPIError('Cannot create page', errors);

  const validationErrors = validatePageCreateInput(input);
  const { contents, meta, name } = input;
  const maybeExistentPage = await context.loaders.page.byName.load(name);

  if (maybeExistentPage !== undefined)
    validationErrors.name.push(`Must be unique, ${name} already exists`);

  if (hasValidationErrors(validationErrors))
    return {
      errors: validationErrors,
    };

  const page = await context.mutators.page.create({
    contents: contents ? sanitizeString(contents) : undefined,
    meta,
    name,
  });

  if (page) clearPageLoaders(context.loaders.page, { ...page });

  return { page: page ?? null };
};
