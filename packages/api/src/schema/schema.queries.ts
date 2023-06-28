import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { docQueries } from './doc';
import { pagesQueries } from './pages';

export const query = new GraphQLObjectType<null, APIContext>({
  name: 'Query',
  fields: {
    ...docQueries,
    ...pagesQueries,
  },
});
