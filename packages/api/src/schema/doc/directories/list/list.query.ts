import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type {
  APIContext,
  ConnectionInput,
  DocDirectory,
} from '../../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../../utils/constants';
import { generateCursor } from '../../../../utils/helpers';
import { directoriesListResolver } from './list.resolver';
import {
  DocDirectoryConnectionType,
  DocDirectoryOrderType,
  DocDirectoryWhereInputType,
} from './list.types';

export const directories: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocDirectory>
> = {
  type: DocDirectoryConnectionType,
  args: {
    first: {
      defaultValue: DEFAULT_EDGES_NUMBER,
      description: `Limits the number of results returned in a page.`,
      type: GraphQLInt,
    },
    after: {
      defaultValue: generateCursor(0),
      description: 'The cursor value of an item returned in previous page.',
      type: GraphQLString,
    },
    offset: {
      description: 'The query offset.',
      type: GraphQLInt,
    },
    orderBy: {
      description: 'Reorder the results.',
      type: DocDirectoryOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: DocDirectoryWhereInputType,
    },
  },
  resolve: directoriesListResolver,
};
