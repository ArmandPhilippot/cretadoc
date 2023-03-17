import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocDirectory, QueryInput } from '../../../../types';
import {
  InputValidationError,
  LoadersError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
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
  },
  resolve: async (_source, { id, path }, context) => {
    if (!context.loaders?.doc)
      throw new LoadersError(error.missing.loader('Documentation'));

    if (!id && !path)
      throw new InputValidationError(error.missing.input, ['id', 'path']);

    if (id && path)
      throw new InputValidationError(error.invalid.input, ['id', 'path']);

    if (id) return context.loaders.doc.directory.byId.load(id);
    if (path) return context.loaders.doc.directory.byPath.load(path);
    return undefined;
  },
};
