import type { GraphQLFieldResolver } from 'graphql';
import type { Maybe } from 'graphql-yoga';
import type { APIContext, Page, PageInput } from '../../../types';
import { CretadocAPIError, UserInputError } from '../../../utils/exceptions';
import { validateArgsLength } from '../../../utils/helpers/validators';

export const resolvePage: GraphQLFieldResolver<
  null,
  APIContext,
  Partial<PageInput>
> = async (_, input, context): Promise<Maybe<Page>> => {
  if (!context.loaders?.page)
    throw new CretadocAPIError('Cannot get page', {
      errorKind: 'reference',
      reason: 'Page loaders are not initialized',
      received: typeof context.loaders?.doc,
    });

  const inputError = validateArgsLength(input, 1);

  if (inputError)
    throw new UserInputError(inputError, {
      expected: 'Either an id, a name or a slug',
    });

  const { id, name, slug } = input;
  let page: Maybe<Page> = undefined;

  if (name) page = await context.loaders.page.byName.load(name);
  else if (id) page = await context.loaders.page.byId.load(id);
  else if (slug) page = await context.loaders.page.bySlug.load(slug);

  return page;
};
