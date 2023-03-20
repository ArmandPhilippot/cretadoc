import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocEntry, QueryInput } from '../../../../types';
import {
  InputValidationError,
  LoadersError,
} from '../../../../utils/errors/exceptions';
import { error } from '../../../../utils/errors/messages';
import { DocEntryType } from '../entries.types';

export const entry: GraphQLFieldConfig<
  null,
  APIContext,
  QueryInput<DocEntry>
> = {
  type: DocEntryType,
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

    if (id) return context.loaders.doc.entry.byId.load(id);
    if (path) return context.loaders.doc.entry.byPath.load(path);
    return undefined;
  },
};
