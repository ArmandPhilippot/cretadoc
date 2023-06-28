import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { docMutations } from './doc';
import { pagesMutations } from './pages';

export const mutation = new GraphQLObjectType<null, APIContext>({
  name: 'Mutation',
  fields: {
    ...docMutations,
    ...pagesMutations,
  },
});
