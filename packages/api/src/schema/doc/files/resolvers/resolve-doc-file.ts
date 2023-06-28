import type { GraphQLFieldResolver } from 'graphql';
import type { Maybe } from 'graphql-yoga';
import type { APIContext, DocFile, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';

export const resolveDocFile: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocFile>
> = async (_, { id, path, slug }, context): Promise<Maybe<DocFile>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get doc file', {
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

  if (id) return context.loaders.doc.file.byId.load(id);
  if (path) return context.loaders.doc.file.byPath.load(path);
  if (slug) return context.loaders.doc.file.bySlug.load(slug);
  return undefined;
};
