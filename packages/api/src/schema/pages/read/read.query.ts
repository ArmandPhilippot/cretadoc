import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, PageInput } from '../../../types';
import {
  InputValidationError,
  LoadersError,
} from '../../../utils/errors/exceptions';
import { error } from '../../../utils/errors/messages';
import { PageType } from '../pages.types';

export const page: GraphQLFieldConfig<null, APIContext, Partial<PageInput>> = {
  type: PageType,
  args: {
    id: {
      type: GraphQLString,
      description: 'The id of the page.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the page (without extension).',
    },
  },
  resolve: async (_source, { id, name }, context) => {
    if (!context.loaders?.page)
      throw new LoadersError('Page cannot be loaded.');

    if (!id && !name)
      throw new InputValidationError(error.missing.input, ['id', 'name']);

    if (id && name)
      throw new InputValidationError(error.invalid.input, ['id', 'name']);

    if (name) return context.loaders.page.byName.load(name);
    if (id) return context.loaders.page.byId.load(id);
    return undefined;
  },
};
