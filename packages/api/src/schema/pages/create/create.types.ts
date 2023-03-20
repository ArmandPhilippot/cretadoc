import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  PageCreateErrors,
  PageCreatePayload,
} from '../../../types';
import { PagePayloadType } from '../pages.types';

export const PageCreateInputType = new GraphQLInputObjectType({
  name: 'PageCreateInput',
  description: 'The input to create a new page.',
  fields: {
    contents: {
      description: 'The page contents.',
      type: GraphQLString,
    },
    name: {
      description: 'The page name.',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export const PageCreateErrorsType = new GraphQLObjectType<
  PageCreateErrors,
  APIContext
>({
  name: 'PageCreateErrors',
  description: 'The validation errors when creating a new page.',
  fields: {
    errors: {
      type: new GraphQLObjectType<PageCreateErrors['errors']>({
        name: 'PageCreateErrorsProperties',
        fields: {
          contents: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ contents }) => contents,
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

export const PageCreateResultType = new GraphQLUnionType({
  name: 'PageCreateResult',
  description: 'Either the page data or errors.',
  types: [PagePayloadType, PageCreateErrorsType],
  resolveType(value: PageCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'PageCreateErrors';

    return 'PagePayload';
  },
});
