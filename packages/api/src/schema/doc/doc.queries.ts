import { type GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import type { APIContext } from '../../types';
import { docDirectoriesQueries } from './directories';
import { docEntriesQueries } from './entries';
import { docFilesQueries } from './files';

const doc: GraphQLFieldConfig<null, APIContext, null> = {
  description: 'Return the documentation nodes.',
  type: new GraphQLObjectType({
    name: 'Doc',
    description: 'The documentation nodes.',
    fields: () => {
      return {
        ...docDirectoriesQueries,
        ...docEntriesQueries,
        ...docFilesQueries,
      };
    },
  }),
  resolve: () => true,
};

export const docQueries = { doc };
