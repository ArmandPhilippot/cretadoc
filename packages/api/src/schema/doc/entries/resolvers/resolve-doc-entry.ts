import type { Maybe } from '@cretadoc/utils';
import type { GraphQLFieldResolver } from 'graphql';
import type { APIContext, DocEntry, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';

export const resolveDocEntry: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocEntry>
> = async (_, { id, path, slug }, context): Promise<Maybe<DocEntry>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get entry', {
      errorKind: 'reference',
      reason: 'Doc loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  if (!id && !path && !slug)
    throw new UserInputError('An argument is required', {
      expected: 'Either an id, a path or a slug',
    });

  if ((id && path) || (id && slug) || (path && slug))
    throw new UserInputError('Too many arguments', {
      expected: 'Either an id, a path or a slug',
    });

  if (id) return context.loaders.doc.entry.byId.load(id);
  if (path) return context.loaders.doc.entry.byPath.load(path);
  if (slug) return context.loaders.doc.entry.bySlug.load(slug);
  return undefined;
};
