import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { pageMutations } from './pages/pages.mutations';

export const mutation = new GraphQLObjectType<null, APIContext>({
  name: 'Mutation',
  fields: {
    ...pageMutations,
  },
});
