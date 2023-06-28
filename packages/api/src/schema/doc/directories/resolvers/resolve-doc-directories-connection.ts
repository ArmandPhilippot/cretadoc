import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocDirectory,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor } from '../../../../utils/helpers';

export const resolveDocDirectoriesConnection: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<DocDirectory>
> = async (
  _,
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
};
