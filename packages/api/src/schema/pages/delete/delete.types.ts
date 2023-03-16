import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  PageDeleteErrors,
  PageDeleteResult,
} from '../../../types';
import { PagePayloadType } from '../pages.types';

export const PageDeleteInputType = new GraphQLInputObjectType({
  name: 'PageDeleteInput',
  description: 'The input to delete an existing page.',
  fields: {
    id: {
      description: 'The page id.',
      type: GraphQLString,
    },
    name: {
      description: 'The page name.',
      type: GraphQLString,
    },
  },
});

export const PageDeleteErrorsType = new GraphQLObjectType<
  PageDeleteErrors,
  APIContext
>({
  name: 'PageDeleteErrors',
  description: 'The errors when deleting a page.',
  fields: {
    errors: {
      type: new GraphQLObjectType<PageDeleteErrors['errors']>({
        name: 'PageDeleteErrorsProperties',
        fields: {
          id: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ id }) => id,
          },
          name: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ name }) => name,
          },
        },
      }),
    },
  },
});

export const PageDeleteResultType = new GraphQLUnionType({
  name: 'PageDeleteResult',
  description: 'Either the deleted page data or errors.',
  types: [PagePayloadType, PageDeleteErrorsType],
  resolveType(value: PageDeleteResult) {
    if (Object.hasOwn(value, 'errors')) return 'PageDeleteErrors';

    return 'PagePayload';
  },
});
