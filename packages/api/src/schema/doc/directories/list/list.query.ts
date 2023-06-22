import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocDirectory,
} from '../../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../../utils/constants';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor, generateCursor } from '../../../../utils/helpers';
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
  resolve: async (
    _source,
    { after: afterCursor, offset, ...args },
    context
  ): Promise<Connection<DocDirectory>> => {
    if (!context.loaders?.doc)
      throw new CretadocAPIError('Cannot get directories connection', {
        errorKind: 'reference',
        reason: 'Doc loaders are not initialized',
        received: typeof context.loaders?.doc,
      });

    const after = offset ?? decodeCursor(afterCursor);
    const foundDocDirectories = await context.loaders.doc.directory.list({
      ...args,
      after,
    });

    return getConnection({
      after,
      data: foundDocDirectories.data,
      first: args.first,
      total: foundDocDirectories.total,
    });
  },
};
