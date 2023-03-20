import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  PageCreateInput,
  PageCreatePayload,
} from '../../../types';
import { LoadersError, MutatorsError } from '../../../utils/errors/exceptions';
import { error } from '../../../utils/errors/messages';
import { hasValidationErrors, sanitizeString } from '../../../utils/helpers';
import { clearPageLoaders } from '../pages.loaders';
import { validatePageCreateInput } from '../pages.validators';
import { PageCreateInputType, PageCreateResultType } from './create.types';

export const pageCreate: GraphQLFieldConfig<null, APIContext, PageCreateInput> =
  {
    type: PageCreateResultType,
    description: 'Create a new page.',
    args: {
      input: {
        type: new GraphQLNonNull(PageCreateInputType),
      },
    },
    resolve: async (
      _source,
      { input },
      context
    ): Promise<PageCreatePayload> => {
      if (!context.mutators?.page)
        throw new MutatorsError(error.missing.mutator('Page'));

      if (!context.loaders?.page)
        throw new LoadersError(error.missing.loader('Page'));

      const validationErrors = validatePageCreateInput(input);
      const { contents, name } = input;
      const maybeExistentPage = await context.loaders.page.byName.load(name);

      if (maybeExistentPage !== undefined)
        validationErrors.name.push(error.validation.existent('page'));

      if (hasValidationErrors(validationErrors))
        return {
          errors: validationErrors,
        };

      const page = await context.mutators.page.create({
        contents: contents ? sanitizeString(contents) : undefined,
        name,
      });

      if (page) clearPageLoaders(context.loaders.page, { ...page });

      return { page: page ?? null };
    },
  };
