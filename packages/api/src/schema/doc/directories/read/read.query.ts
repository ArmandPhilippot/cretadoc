import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocDirectory, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import { DocDirectoryType } from '../directories.types';

export const directory: GraphQLFieldConfig<
  null,
  APIContext,
  QueryInput<DocDirectory>
> = {
  type: DocDirectoryType,
  args: {
    id: {
      type: GraphQLString,
    },
    path: {
      type: GraphQLString,
    },
    slug: {
      type: GraphQLString,
    },
  },
  resolve: async (_source, { id, path, slug }, context) => {
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
  },
};
