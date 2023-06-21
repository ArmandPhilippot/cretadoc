import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocFile,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor, generateCursor } from '../../../../utils/helpers';
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
      defaultValue: 10,
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
  resolve: async (
    _source,
    { after: afterCursor, offset, ...args },
    context
  ): Promise<Connection<DocFile>> => {
    if (!context.loaders?.doc)
      throw new CretadocAPIError('Cannot get doc files connection', {
        errorKind: 'reference',
        reason: 'Doc loaders are not initialized',
        received: typeof context.loaders?.doc,
      });

    const after = offset ?? decodeCursor(afterCursor);
    const foundDocFiles = await context.loaders.doc.file.list({
      ...args,
      after,
    });

    return getConnection({
      after,
      data: foundDocFiles.data,
      first: args.first,
      total: foundDocFiles.total,
    });
  },
};
