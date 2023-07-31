import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocFile,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import {
  DocFileConnectionType,
  DocFileType,
  DocOrderByInputType,
  DocWhereInputType,
} from '../doc.types';
import { resolveDocFile, resolveDocFilesConnection } from './resolvers';

const file: GraphQLFieldConfig<null, APIContext, QueryInput<DocFile>> = {
  type: DocFileType,
  args: {
    id: {
      description: 'Retrieve a documentation file by id.',
      type: GraphQLString,
    },
    path: {
      description: 'Retrieve a documentation file by path.',
      type: GraphQLString,
    },
    slug: {
      description: 'Retrieve a documentation file by slug.',
      type: GraphQLString,
    },
  },
  resolve: resolveDocFile,
};

const files: GraphQLFieldConfig<null, APIContext, ConnectionInput<DocFile>> = {
  type: DocFileConnectionType,
  args: getConnectionArgs({
    orderBy: DocOrderByInputType,
    where: DocWhereInputType,
  }),
  resolve: resolveDocFilesConnection,
};

export const docFilesQueries = { file, files };
