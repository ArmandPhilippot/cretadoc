import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocFile, QueryInput } from '../../../../types';
import { DocFileType } from '../files.types';
import { fileReadResolver } from './read.resolver';

export const file: GraphQLFieldConfig<null, APIContext, QueryInput<DocFile>> = {
  type: DocFileType,
  args: {
    id: {
      type: GraphQLString,
    },
    path: {
      type: GraphQLString,
    },
    slug: {
      type: GraphQLString,
    },
  },
  resolve: fileReadResolver,
};
