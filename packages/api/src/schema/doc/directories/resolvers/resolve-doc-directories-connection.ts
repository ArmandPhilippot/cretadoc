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
  { after: afterCursor, first, offset, ...input },
  context
): Promise<Connection<DocDirectory>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get directories connection', {
      errorKind: 'reference',
      reason: 'Doc loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const after = offset ?? decodeCursor(afterCursor);
  const data = await context.loaders.doc.directory.list(input);

  return getConnection({ after, data, first });
};
