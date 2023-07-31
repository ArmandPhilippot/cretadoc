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

export const resolveDocEntriesConnection: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<DocEntry>,
  Promise<Connection<DocEntry>>
> = async (_, { after: afterCursor, first, offset, ...input }, context) => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get entries connection', {
      errorKind: 'reference',
      reason: 'Doc loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const after = offset ?? decodeCursor(afterCursor);
  const data = await context.loaders.doc.entry.list(input);

  return getConnection({ after, data, first });
};
