import type { GraphQLFieldResolver } from 'graphql';
import type {
  APIContext,
  Connection,
  ConnectionInput,
  DocFile,
} from '../../../../types';
import { CretadocAPIError } from '../../../../utils/exceptions';
import { getConnection } from '../../../../utils/gql';
import { decodeCursor } from '../../../../utils/helpers';

export const filesListResolver: GraphQLFieldResolver<
  null,
  APIContext,
  ConnectionInput<DocFile>
> = async (
  _,
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
};
