import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  PageByIdLoader,
  PageByNameLoader,
  PageDeleteInput,
  PageDeletePayload,
} from '../../../types';
import {
  InputValidationError,
  LoadersError,
  MutatorsError,
} from '../../../utils/errors/exceptions';
import { error } from '../../../utils/errors/messages';
import { hasValidationErrors } from '../../../utils/helpers';
import { clearPageLoaders } from '../pages.loaders';
import { validatePageDeleteInput } from '../pages.validators';
import { PageDeleteInputType, PageDeleteResultType } from './delete.types';

export const pageDelete: GraphQLFieldConfig<null, APIContext, PageDeleteInput> =
  {
    type: PageDeleteResultType,
    description: 'Delete an existing page.',
    args: {
      input: {
        type: new GraphQLNonNull(PageDeleteInputType),
      },
    },
    resolve: async (
      _source,
      { input },
      context
    ): Promise<PageDeletePayload> => {
      if (!context.mutators?.page)
        throw new MutatorsError(error.missing.mutator('Page'));

      if (!context.loaders?.page)
        throw new LoadersError(error.missing.loader('Page'));

      if (!input.id && !input.name)
        throw new InputValidationError(error.missing.input, ['id', 'name']);

      if (input.id && input.name)
        throw new InputValidationError(error.invalid.input, ['id', 'name']);

      const loader: PageByIdLoader | PageByNameLoader = input.id
        ? context.loaders.page.byId
        : context.loaders.page.byName;
      const validationErrors = await validatePageDeleteInput(input, loader);

      if (hasValidationErrors(validationErrors))
        return { errors: validationErrors };

      const page = await context.mutators.page.del(input);

      if (page) clearPageLoaders(context.loaders.page, { ...page });

      return { page: page ?? null };
    },
  };
