import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type { APIContext, DocDirectory, QueryInput } from '../../../../types';
import { DocDirectoryType } from '../directories.types';
import { directoryReadResolver } from './read.resolver';

export const directory: GraphQLFieldConfig<
  null,
  APIContext,
  QueryInput<DocDirectory>
> = {
  type: DocDirectoryType,
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
  resolve: directoryReadResolver,
};
