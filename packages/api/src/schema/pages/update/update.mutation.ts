import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  PageUpdateInput,
  PageUpdatePayload,
} from '../../../types';
import { LoadersError, MutatorsError } from '../../../utils/errors/exceptions';
import { error } from '../../../utils/errors/messages';
import { hasValidationErrors, sanitizeString } from '../../../utils/helpers';
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
      if (!context.mutators?.page)
        throw new MutatorsError(error.missing.mutator('Page'));

      if (!context.loaders?.page)
        throw new LoadersError(error.missing.loader('Page'));

      const validationErrors = validatePageUpdateInput(input);

      const { content, id, name } = input;

      const maybeExistentPage = await context.loaders.page.byId.load(id);

      if (!maybeExistentPage)
        validationErrors.id.push(error.validation.missing('page'));

      if (hasValidationErrors(validationErrors))
        return { errors: validationErrors };

      const page = await context.mutators.page.update({
        content: content ? sanitizeString(content) : undefined,
        id,
        name,
      });

      if (page) clearPageLoaders(context.loaders.page, { ...page });

      return { page: page ?? null };
    },
  };
