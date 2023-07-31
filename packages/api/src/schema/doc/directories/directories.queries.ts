import { type GraphQLFieldConfig, GraphQLString } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocDirectory,
  QueryInput,
} from '../../../types';
import { getConnectionArgs } from '../../../utils/gql';
import {
  DocDirectoryConnectionType,
  DocDirectoryType,
  DocOrderByInputType,
  DocWhereInputType,
} from '../doc.types';
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
      description: 'Retrieve a documentation directory by id.',
      type: GraphQLString,
    },
    path: {
      description: 'Retrieve a documentation directory by path.',
      type: GraphQLString,
    },
    slug: {
      description: 'Retrieve a documentation directory by slug.',
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
    orderBy: DocOrderByInputType,
    where: DocWhereInputType,
  }),
  resolve: resolveDocDirectoriesConnection,
};

export const docDirectoriesQueries = { directories, directory };
