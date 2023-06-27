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
import { PageMetaInputType, PagePayloadType } from '../pages.types';

export const PageUpdateInputType = new GraphQLInputObjectType({
  name: 'PageUpdateInput',
  description: 'The input to update an existing page.',
  fields: {
    contents: {
      description: 'The page contents.',
      type: GraphQLString,
    },
    id: {
      description: 'The page id.',
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      description: 'The page metadata.',
      type: PageMetaInputType,
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
          contents: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ contents }) => contents,
          },
          id: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ id }) => id,
          },
          meta: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ meta }) => meta,
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
