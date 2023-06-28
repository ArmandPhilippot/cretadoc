import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type { APIContext, ConnectionInput, Page } from '../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../utils/constants';
import { generateCursor } from '../../../utils/helpers';
import { pagesListResolver } from './list.resolver';
import {
  PageConnectionType,
  PageOrderType,
  PageWhereInputType,
} from './list.types';

export const pages: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<Page>
> = {
  type: PageConnectionType,
  args: {
    first: {
      defaultValue: DEFAULT_EDGES_NUMBER,
      description: 'Limits the number of results returned in a page.',
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
      type: PageOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: PageWhereInputType,
    },
  },
  resolve: pagesListResolver,
};
