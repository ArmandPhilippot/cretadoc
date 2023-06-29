import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageUpdate,
  PageUpdateInput,
  PageUpdatePayload,
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
  validateFileId,
  validateFilename,
  validateFrontMatterMeta,
} from '../../../utils/helpers/validators';
import { clearPageLoaders } from '../pages.loaders';

/**
 * Validate the input to update a page.
 *
 * @param {T} input - The page data.
 * @returns {ValidationErrors<T>} The validation errors.
 */
const validatePageUpdateInput = <T extends PageUpdate>(
  input: T
): ValidationErrors<T> => {
  const validationErrors = initValidationErrors(input);
  const { id, contents, meta, name } = input;

  validationErrors.id.push(...validateFileId(id));

  if (contents)
    validationErrors.contents.push(...validateFileContents(contents));

  if (meta) validationErrors.meta.push(...validateFrontMatterMeta(meta));

  if (name) validationErrors.name.push(...validateFilename(name));

  return validationErrors;
};

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
