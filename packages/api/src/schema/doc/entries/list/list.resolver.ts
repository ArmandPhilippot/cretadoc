import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocEntry,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor } from '../../../../utils/helpers';

export const entriesListResolver: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<DocEntry>
> = async (
  _,
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
};
