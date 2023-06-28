import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type { APIContext, ConnectionInput, DocEntry } from '../../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../../utils/constants';
import { generateCursor } from '../../../../utils/helpers';
import { entriesListResolver } from './list.resolver';
import {
  DocEntryConnectionType,
  DocEntryOrderType,
  DocEntryWhereInputType,
} from './list.types';

export const entries: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocEntry>
> = {
  type: DocEntryConnectionType,
  args: {
    first: {
      defaultValue: DEFAULT_EDGES_NUMBER,
      description: `Limits the number of results returned in a page.`,
      type: GraphQLInt,
    },
    after: {
      defaultValue: generateCursor(0),
      description: 'The cursor value of an item returned in previous page.',
      type: GraphQLString,
    },
    offset: {
      description: 'The query offset.',
      type: GraphQLInt,
    },
    orderBy: {
      description: 'Reorder the results.',
      type: DocEntryOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: DocEntryWhereInputType,
    },
  },
  resolve: entriesListResolver,
};
