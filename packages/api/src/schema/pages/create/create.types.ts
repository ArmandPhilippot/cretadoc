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

export const PageMetaInputType = new GraphQLInputObjectType({
  name: 'PageMetaInput',
  description: 'The page metadata.',
  fields: {
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the page.',
    },
    seoDescription: {
      type: GraphQLString,
      description: 'The meta description.',
    },
    seoTitle: {
      type: GraphQLString,
      description: 'The title used by search engines.',
    },
    status: {
      type: GraphQLString,
      description: 'The status of the page.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the page.',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The update date of the page.',
    },
  },
});

export const PageCreateInputType = new GraphQLInputObjectType({
  name: 'PageCreateInput',
  description: 'The input to create a new page.',
  fields: {
    contents: {
      description: 'The page contents.',
      type: GraphQLString,
    },
    meta: {
      description: 'The page metadata.',
      type: PageMetaInputType,
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

export const PageCreateResultType = new GraphQLUnionType({
  name: 'PageCreateResult',
  description: 'Either the page data or errors.',
  types: [PagePayloadType, PageCreateErrorsType],
  resolveType(value: PageCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'PageCreateErrors';

    return 'PagePayload';
  },
});
