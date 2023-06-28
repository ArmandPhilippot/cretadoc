import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocEntry,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import { DocEntryType } from '../doc.types';
import {
  DocEntryConnectionType,
  DocEntryOrderByInputType,
  DocEntryWhereInputType,
} from './entries.types';
import { resolveDocEntriesConnection, resolveDocEntry } from './resolvers';

const entry: GraphQLFieldConfig<null, APIContext, QueryInput<DocEntry>> = {
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
  resolve: resolveDocEntry,
};

const entries: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocEntry>
> = {
  type: DocEntryConnectionType,
  args: getConnectionArgs({
    orderBy: DocEntryOrderByInputType,
    where: DocEntryWhereInputType,
  }),
  resolve: resolveDocEntriesConnection,
};

export const docEntriesQueries = { entries, entry };
