import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type { APIContext, ConnectionInput, DocFile } from '../../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../../utils/constants';
import { generateCursor } from '../../../../utils/helpers';
import { filesListResolver } from './list.resolver';
import {
  DocFileConnectionType,
  DocFileOrderType,
  DocFileWhereInputType,
} from './list.types';

export const files: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocFile>
> = {
  type: DocFileConnectionType,
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
      type: DocFileOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: DocFileWhereInputType,
    },
  },
  resolve: filesListResolver,
};
