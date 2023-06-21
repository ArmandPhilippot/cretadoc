import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
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
import { PageUpdateInputType, PageUpdateResultType } from './update.types';

export const pageUpdate: GraphQLFieldConfig<null, APIContext, PageUpdateInput> =
  {
    type: PageUpdateResultType,
    description: 'Update an existing page.',
    args: {
      input: {
        type: new GraphQLNonNull(PageUpdateInputType),
      },
    },
    resolve: async (
      _source,
      { input },
      context
    ): Promise<PageUpdatePayload> => {
      const errors = validateContext(context, 'page');

      if (!isValidContext(context, 'page', errors))
        throw new CretadocAPIError('Cannot update page', errors);

      const validationErrors = validatePageUpdateInput(input);

      const { contents, id, name } = input;

      const maybeExistentPage = await context.loaders.page.byId.load(id);

      if (!maybeExistentPage)
        validationErrors.id.push('The requested page id does not exist');

      if (hasValidationErrors(validationErrors))
        return { errors: validationErrors };

      const page = await context.mutators.page.update({
        contents: contents ? sanitizeString(contents) : undefined,
        id,
        name,
      });

      if (page) clearPageLoaders(context.loaders.page, { ...page });

      return { page: page ?? null };
    },
  };
