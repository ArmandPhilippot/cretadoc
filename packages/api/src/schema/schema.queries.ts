import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { doc } from './doc/doc.queries';
import { page, pages } from './pages/pages.queries';

export const query = new GraphQLObjectType<null, APIContext>({
  name: 'Query',
  fields: {
    doc,
    page,
    pages,
  },
});
