import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import type { APIContext, Page, PagePayload } from '../../types';

export const PageType = new GraphQLObjectType<Page, APIContext>({
  name: 'Page',
  description: 'A single page.',
  fields: () => {
    return {
      contents: {
        type: GraphQLString,
        description: 'The contents of the page.',
        resolve: ({ contents }) => contents,
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The creation date of the page.',
        resolve: ({ createdAt }) => createdAt,
      },
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the page.',
        resolve: ({ id }) => id,
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The page filename.',
        resolve: ({ name }) => name,
      },
      path: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The page path.',
        resolve: ({ path }) => path,
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The update date of the page.',
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

export const PagePayloadType = new GraphQLObjectType<PagePayload, APIContext>({
  name: 'PagePayload',
  fields: {
    page: { type: PageType },
  },
});
