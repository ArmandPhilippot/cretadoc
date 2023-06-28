import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocDirectory,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import { DocDirectoryType } from '../doc.types';
import {
  DocDirectoryConnectionType,
  DocDirectoryOrderByInputType,
  DocDirectoryWhereInputType,
} from './directories.types';
import {
  resolveDocDirectoriesConnection,
  resolveDocDirectory,
} from './resolvers';

const directory: GraphQLFieldConfig<
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
  resolve: resolveDocDirectory,
};

const directories: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocDirectory>
> = {
  type: DocDirectoryConnectionType,
  args: getConnectionArgs({
    orderBy: DocDirectoryOrderByInputType,
    where: DocDirectoryWhereInputType,
  }),
  resolve: resolveDocDirectoriesConnection,
};

export const docDirectoriesQueries = { directories, directory };
