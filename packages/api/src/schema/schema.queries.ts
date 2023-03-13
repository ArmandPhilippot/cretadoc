import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { page, pages } from './pages/pages.queries';

export const query = new GraphQLObjectType<null, APIContext>({
  name: 'Query',
  fields: {
    page,
    pages,
  },
});
