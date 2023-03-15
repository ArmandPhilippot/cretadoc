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
  PageUpdateErrors,
  PageUpdatePayload,
} from '../../../types';
import { PagePayloadType } from '../pages.types';

export const PageUpdateInputType = new GraphQLInputObjectType({
  name: 'PageUpdateInput',
  description: 'The input to update an existing page.',
  fields: {
    content: {
      description: 'The page content.',
      type: GraphQLString,
    },
    id: {
      description: 'The page id.',
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      description: 'The page name.',
      type: GraphQLString,
    },
  },
});

export const PageUpdateErrorsType = new GraphQLObjectType<
  PageUpdateErrors,
  APIContext
>({
  name: 'PageUpdateErrors',
  description: 'The error when updating a page.',
  fields: {
    errors: {
      type: new GraphQLObjectType<PageUpdateErrors['errors']>({
        name: 'PageUpdateErrorsProperties',
        fields: {
          content: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ content }) => content,
          },
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

export const PageUpdateResultType = new GraphQLUnionType({
  name: 'PageUpdateResult',
  description: 'Either the updated page data or errors.',
  types: [PagePayloadType, PageUpdateErrorsType],
  resolveType(value: PageUpdatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'PageUpdateErrors';

    return 'PagePayload';
  },
});
