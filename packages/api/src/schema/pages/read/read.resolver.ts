import type { Maybe } from '@cretadoc/utils';
import type { GraphQLFieldResolver } from 'graphql';
import type { APIContext, Page, PageInput } from '../../../types';
import { CretadocAPIError, UserInputError } from '../../../utils/exceptions';

export const pageReadResolver: GraphQLFieldResolver<
  null,
  APIContext,
  Partial<PageInput>
> = async (_, { id, name, slug }, context): Promise<Maybe<Page>> => {
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
};
