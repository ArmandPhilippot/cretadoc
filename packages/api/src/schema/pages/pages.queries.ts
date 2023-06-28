import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  Page,
  QueryInput,
} from '../../types';
import { getConnectionArgs } from '../../utils/gql';
import {
  PageConnectionType,
  PageOrderByInputType,
  PageType,
  PageWhereInputType,
} from './pages.types';
import { resolvePage, resolvePagesConnection } from './resolvers';

const page: GraphQLFieldConfig<null, APIContext, QueryInput<Page>> = {
  type: PageType,
  args: {
    id: {
      type: GraphQLString,
      description: 'The id of the page.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the page (without extension).',
    },
    slug: {
      type: GraphQLString,
      description: 'The slug of the page.',
    },
  },
  resolve: resolvePage,
};

const pages: GraphQLFieldConfig<null, APIContext, ConnectionInput<Page>> = {
  type: PageConnectionType,
  args: getConnectionArgs({
    orderBy: PageOrderByInputType,
    where: PageWhereInputType,
  }),
  resolve: resolvePagesConnection,
};

export const pagesQueries = { page, pages };
