import { GraphQLInt, GraphQLString, type GraphQLFieldConfig } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  Page,
} from '../../../types';
import { LoadersError } from '../../../utils/errors/exceptions';
import { error } from '../../../utils/errors/messages';
import { getConnection } from '../../../utils/gql';
import { decodeCursor, generateCursor } from '../../../utils/helpers';
import {
  PageConnectionType,
  PageOrderType,
  PageWhereInputType,
} from './list.types';

export const pages: GraphQLFieldConfig<
  null,
  APIContext,
  ConnectionInput<Page>
> = {
  type: PageConnectionType,
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
      type: PageOrderType,
    },
    where: {
      description: 'Filter the results.',
      type: PageWhereInputType,
    },
  },
  resolve: async (
    _source,
    { after: afterCursor, offset, ...args },
    context
  ): Promise<Connection<Page>> => {
    if (!context.loaders?.page)
      throw new LoadersError(error.missing.loader('Page'));

    const after = offset ?? decodeCursor(afterCursor);
    const foundPages = await context.loaders.page.list({ ...args, after });

    return getConnection({
      after,
      data: foundPages.data,
      first: args.first,
      total: foundPages.total,
    });
  },
};
