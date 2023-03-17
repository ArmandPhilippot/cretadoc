import { GraphQLObjectType } from 'graphql';
import type { APIContext } from '../types';
import { docMutations } from './doc/doc.mutations';
import { pageMutations } from './pages/pages.mutations';

export const mutation = new GraphQLObjectType<null, APIContext>({
  name: 'Mutation',
  fields: {
    ...docMutations,
    ...pageMutations,
  },
});
