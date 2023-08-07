import type { Maybe } from '@cretadoc/utils';
import type { GraphQLFieldResolver } from 'graphql';
import type { APIContext, DocEntry, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import { validateArgsLength } from '../../../../utils/helpers/validators';

export const resolveDocEntry: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocEntry>
> = async (_, input, context): Promise<Maybe<DocEntry>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get entry', {
      errorKind: 'reference',
      reason: 'Doc loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const inputError = validateArgsLength(input, 1);

  if (inputError)
    throw new UserInputError(inputError, {
      expected: 'Either an id, a path or a slug',
    });

  const { id, path, slug } = input;
  let entry: Maybe<DocEntry> = undefined;

  if (id) entry = await context.loaders.doc.entry.byId.load(id);
  else if (path) entry = await context.loaders.doc.entry.byPath.load(path);
  else if (slug) entry = await context.loaders.doc.entry.bySlug.load(slug);

  return entry;
};
