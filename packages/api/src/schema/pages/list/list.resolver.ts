import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  Page,
} from '../../../types';
import { CretadocAPIError } from '../../../utils/exceptions';
import { getConnection } from '../../../utils/gql';
import { decodeCursor } from '../../../utils/helpers';

export const pagesListResolver: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<Page>
> = async (
  _,
  { after: afterCursor, offset, ...args },
  context
): Promise<Connection<Page>> => {
  if (!context.loaders?.page)
    throw new CretadocAPIError('Cannot get pages connection', {
      errorKind: 'reference',
      reason: 'Page loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const after = offset ?? decodeCursor(afterCursor);
  const foundPages = await context.loaders.page.list({ ...args, after });

  return getConnection({
    after,
    data: foundPages.data,
    first: args.first,
    total: foundPages.total,
  });
};
