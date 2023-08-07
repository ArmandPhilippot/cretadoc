import type { GraphQLFieldResolver } from 'graphql';
import type { Maybe } from 'graphql-yoga';
import type { APIContext, DocFile, QueryInput } from '../../../../types';
import { CretadocAPIError, UserInputError } from '../../../../utils/exceptions';
import { validateArgsLength } from '../../../../utils/helpers/validators';

export const resolveDocFile: GraphQLFieldResolver<
  null,
  APIContext,
  QueryInput<DocFile>
> = async (_, input, context): Promise<Maybe<DocFile>> => {
  if (!context.loaders?.doc)
    throw new CretadocAPIError('Cannot get doc file', {
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
  let docFile: Maybe<DocFile> = undefined;

  if (id) docFile = await context.loaders.doc.file.byId.load(id);
  else if (path) docFile = await context.loaders.doc.file.byPath.load(path);
  else if (slug) docFile = await context.loaders.doc.file.bySlug.load(slug);

  return docFile;
};
