import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, Page, QueryInput } from '../../../types';
import { PageType } from '../pages.types';
import { pageReadResolver } from './read.resolver';

export const page: GraphQLFieldConfig<null, APIContext, QueryInput<Page>> = {
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
  resolve: pageReadResolver,
};
