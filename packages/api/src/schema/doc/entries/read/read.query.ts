import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocEntry, QueryInput } from '../../../../types';
import { DocEntryType } from '../entries.types';
import { entryReadResolver } from './read.resolver';

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
    slug: {
      type: GraphQLString,
    },
  },
  resolve: entryReadResolver,
};
