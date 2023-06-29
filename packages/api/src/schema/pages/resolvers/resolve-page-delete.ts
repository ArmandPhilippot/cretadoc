import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  PageByIdLoader,
  PageByNameLoader,
  PageDelete,
  PageDeleteInput,
  PageDeletePayload,
  ValidationErrors,
  Validator,
} from '../../../types';
import { CretadocAPIError, UserInputError } from '../../../utils/exceptions';
import {
  hasValidationErrors,
  initValidationErrors,
  isValidContext,
  validateContext,
} from '../../../utils/helpers';
import {
  validateFileId,
  validateFilename,
} from '../../../utils/helpers/validators';
import { clearPageLoaders } from '../pages.loaders';

/**
 * Validate the value to delete a page.
 *
 * @param {string} value - The value to delete a page.
 * @param {PageByIdLoader | PageByNameLoader} loader - A method to load a page.
 * @param {Validator} validator - A method to validate the value.
 * @returns {Promise<string[]>} An array of error messages or an empty array.
 */
const validatePageDeleteByIdOrByName = async (
  value: string,
  loader: PageByIdLoader | PageByNameLoader,
  validator: Validator
): Promise<string[]> => {
  const errors: string[] = [];
  errors.push(...validator(value));

  const maybePage = await loader.load(value);

  if (!maybePage) errors.push('The requested page does not exist');

  return errors;
};

/**
 * Validate the input to delete a page.
 *
 * @param {T} input - The page data.
 * @param {T} loader - A method to load a page.
 * @returns {Promise<ValidationErrors<T>>} The validation errors.
 */
const validatePageDeleteInput = async <T extends PageDelete>(
  input: T,
  loader: PageByIdLoader | PageByNameLoader
): Promise<ValidationErrors<T>> => {
  const validationErrors = initValidationErrors(input);
  const { id, name } = input;

  if (id)
    validationErrors.id.push(
      ...(await validatePageDeleteByIdOrByName(id, loader, validateFileId))
    );
  else if (name)
    validationErrors.name.push(
      ...(await validatePageDeleteByIdOrByName(name, loader, validateFilename))
    );

  return validationErrors;
};

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
