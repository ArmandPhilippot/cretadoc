import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, Page, QueryInput } from '../../../types';
import { CretadocAPIError, UserInputError } from '../../../utils/exceptions';
import { PageType } from '../pages.types';

export const page: GraphQLFieldConfig<null, APIContext, QueryInput<Page>> = {
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
    slug: {
      type: GraphQLString,
      description: 'The slug of the page.',
    },
  },
  resolve: async (_source, { id, name, slug }, context) => {
    if (!context.loaders?.page)
      throw new CretadocAPIError('Cannot get page', {
        errorKind: 'reference',
        reason: 'Page loaders are not initialized',
        received: typeof context.loaders?.doc,
      });

    if (!id && !name && !slug)
      throw new UserInputError('An argument is required', {
        expected: 'Either an id, a name or a slug.',
      });

    if ((id && name) || (id && slug) || (name && slug))
      throw new UserInputError('Too many arguments', {
        expected: 'Either an id, a name or a slug.',
      });

    if (name) return context.loaders.page.byName.load(name);
    if (id) return context.loaders.page.byId.load(id);
    if (slug) return context.loaders.page.bySlug.load(slug);
    return undefined;
  },
};
