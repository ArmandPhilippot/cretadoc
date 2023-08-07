import type { GraphQLFieldResolver } from 'graphql';
import type { Maybe } from 'graphql-yoga';
import type { APIContext, DocDirectory, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import { validateArgsLength } from '../../../../utils/helpers/validators';

export const resolveDocDirectory: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocDirectory>
> = async (_, input, context): Promise<Maybe<DocDirectory>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get directory', {
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
  let docDir: Maybe<DocDirectory> = undefined;

  if (id) docDir = await context.loaders.doc.directory.byId.load(id);
  else if (path) docDir = await context.loaders.doc.directory.byPath.load(path);
  else if (slug) docDir = await context.loaders.doc.directory.bySlug.load(slug);

  return docDir;
};
