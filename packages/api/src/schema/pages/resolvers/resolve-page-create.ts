import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageCreate,
  PageCreateInput,
  PageCreatePayload,
  ValidationErrors,
} from '../../../types';
import { CretadocAPIError } from '../../../utils/exceptions';
import {
  hasValidationErrors,
  initValidationErrors,
  isValidContext,
  sanitizeString,
  validateContext,
} from '../../../utils/helpers';
import {
  validateFileContents,
  validateFilename,
  validateFrontMatterMeta,
} from '../../../utils/helpers/validators';
import { clearPageLoaders } from '../pages.loaders';

/**
 * Validate the input to create a page.
 *
 * @param {T} input - The page data.
 * @returns {ValidationErrors<T>} The validation errors.
 */
const validatePageCreateInput = <T extends PageCreate>(
  input: T
): ValidationErrors<T> => {
  const validationErrors = initValidationErrors(input);
  const { contents, excerpt, meta, name } = input;

  if (contents)
    validationErrors.contents.push(...validateFileContents(contents));

  if (excerpt) validationErrors.excerpt.push(...validateFileContents(excerpt));

  if (meta) validationErrors.meta.push(...validateFrontMatterMeta(meta));

  validationErrors.name.push(...validateFilename(name));

  return validationErrors;
};

export const resolvePageCreate: GraphQLFieldResolver<
  null,
  APIContext,
  PageCreateInput
> = async (_, { input }, context): Promise<PageCreatePayload> => {
  const errors = validateContext(context, 'page');

  if (!isValidContext(context, 'page', errors))
    throw new CretadocAPIError('Cannot create page', errors);

  const validationErrors = validatePageCreateInput(input);
  const { contents, excerpt, meta, name } = input;
  const maybeExistentPage = await context.loaders.page.byName.load(name);

  if (maybeExistentPage !== undefined)
    validationErrors.name.push(`Must be unique, ${name} already exists`);

  if (hasValidationErrors(validationErrors))
    return {
      errors: validationErrors,
    };

  const page = await context.mutators.page.create({
    contents: contents ? sanitizeString(contents) : undefined,
    excerpt: excerpt ? sanitizeString(excerpt) : undefined,
    meta,
    name,
  });

  if (page) clearPageLoaders(context.loaders.page, { ...page });

  return { page: page ?? null };
};
