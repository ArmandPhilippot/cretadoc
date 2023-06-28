import type { Maybe } from '@cretadoc/utils';
import type { GraphQLFieldResolver } from 'graphql';
import type { APIContext, DocDirectory, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';

export const directoryReadResolver: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocDirectory>
> = async (_, { id, path, slug }, context): Promise<Maybe<DocDirectory>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get directory', {
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

  if (id) return context.loaders.doc.directory.byId.load(id);
  if (path) return context.loaders.doc.directory.byPath.load(path);
  if (slug) return context.loaders.doc.directory.bySlug.load(slug);
  return undefined;
};
