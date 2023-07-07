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

export const resolvePagesConnection: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<Page>
> = async (
  _,
  { after: afterCursor, first, offset, ...input },
  context
): Promise<Connection<Page>> => {
  if (!context.loaders?.page)
    throw new CretadocAPIError('Cannot get pages connection', {
      errorKind: 'reference',
      reason: 'Page loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const after = offset ?? decodeCursor(afterCursor);
  const data = await context.loaders.page.list(input);

  return getConnection({ after, data, first });
};
