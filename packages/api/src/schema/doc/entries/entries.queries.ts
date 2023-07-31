import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocEntry,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import {
  DocEntryConnectionType,
  DocEntryType,
  DocOrderByInputType,
  DocWhereInputType,
} from '../doc.types';
import { resolveDocEntriesConnection, resolveDocEntry } from './resolvers';

const entry: GraphQLFieldConfig<null, APIContext, QueryInput<DocEntry>> = {
  type: DocEntryType,
  args: {
    id: {
      description: 'Retrieve a documentation entry by id.',
      type: GraphQLString,
    },
    path: {
      description: 'Retrieve a documentation entry by path.',
      type: GraphQLString,
    },
    slug: {
      description: 'Retrieve a documentation entry by slug.',
      type: GraphQLString,
    },
  },
  resolve: resolveDocEntry,
};

const entries: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocEntry>
> = {
  type: DocEntryConnectionType,
  args: getConnectionArgs({
    orderBy: DocOrderByInputType,
    where: DocWhereInputType,
  }),
  resolve: resolveDocEntriesConnection,
};

export const docEntriesQueries = { entries, entry };
