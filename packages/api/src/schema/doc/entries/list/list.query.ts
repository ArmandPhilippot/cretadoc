import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocEntry,
} from '../../../../types';
import { DEFAULT_EDGES_NUMBER } from '../../../../utils/constants';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor, generateCursor } from '../../../../utils/helpers';
import {
  DocEntryConnectionType,
  DocEntryOrderType,
  DocEntryWhereInputType,
} from './list.types';

export const entries: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<DocEntry>
> = {
  type: DocEntryConnectionType,
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
      type: DocEntryOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: DocEntryWhereInputType,
    },
  },
  resolve: async (
    _source,
    { after: afterCursor, offset, ...args },
    context
  ): Promise<Connection<DocEntry>> => {
    if (!context.loaders?.doc)
      throw new CretadocAPIError('Cannot get entries connection', {
        errorKind: 'reference',
        reason: 'Doc loaders are not initialized',
        received: typeof context.loaders?.doc,
      });

    const after = offset ?? decodeCursor(afterCursor);
    const foundDocEntries = await context.loaders.doc.entry.list({
      ...args,
      after,
    });

    return getConnection({
      after,
      data: foundDocEntries.data,
      first: args.first,
      total: foundDocEntries.total,
    });
  },
};
