import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocFile,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import { DocFileType } from '../doc.types';
import {
  DocFileConnectionType,
  DocFileOrderByInputType,
  DocFileWhereInputType,
} from './files.types';
import { resolveDocFile, resolveDocFilesConnection } from './resolvers';

const file: GraphQLFieldConfig<null, APIContext, QueryInput<DocFile>> = {
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
  resolve: resolveDocFile,
};

const files: GraphQLFieldConfig<null, APIContext, ConnectionInput<DocFile>> = {
  type: DocFileConnectionType,
  args: getConnectionArgs({
    orderBy: DocFileOrderByInputType,
    where: DocFileWhereInputType,
  }),
  resolve: resolveDocFilesConnection,
};

export const docFilesQueries = { file, files };
