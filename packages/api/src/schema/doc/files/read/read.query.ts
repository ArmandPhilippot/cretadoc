import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocFile, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import { DocFileType } from '../files.types';

export const file: GraphQLFieldConfig<null, APIContext, QueryInput<DocFile>> = {
  type: DocFileType,
  args: {
    id: {
      type: GraphQLString,
    },
    path: {
      type: GraphQLString,
    },
  },
  resolve: async (_source, { id, path }, context) => {
    if (!context.loaders?.doc)
      throw new CretadocAPIError('Cannot get doc file', {
        errorKind: 'reference',
        reason: 'Doc loaders are not initialized',
        received: typeof context.loaders?.doc,
      });

    if (!id && !path)
      throw new UserInputError('An argument is required', {
        expected: 'Either an id or a path',
      });

    if (id && path)
      throw new UserInputError('Too many arguments', {
        expected: 'Either an id or a path',
      });

    if (id) return context.loaders.doc.file.byId.load(id);
    if (path) return context.loaders.doc.file.byPath.load(path);
    return undefined;
  },
};
