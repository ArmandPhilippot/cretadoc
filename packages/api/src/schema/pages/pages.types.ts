import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import type { APIContext, Meta, Page, PagePayload } from '../../types';

export const PageMetaType = new GraphQLObjectType<Meta>({
  name: 'PageMeta',
  description: 'The metadata of a page.',
  fields: () => {
    return {
      createdAt: {
        type: GraphQLString,
        description: 'The creation date of the page.',
        resolve: ({ createdAt }) => createdAt,
      },
      seoDescription: {
        type: GraphQLString,
        description: 'The meta description.',
        resolve: ({ seoDescription }) => seoDescription,
      },
      seoTitle: {
        type: GraphQLString,
        description: 'The title used by search engines.',
        resolve: ({ seoTitle }) => seoTitle,
      },
      status: {
        type: GraphQLString,
        description: 'The status of the page.',
        resolve: ({ status }) => status,
      },
      title: {
        type: GraphQLString,
        description: 'The title of the page.',
        resolve: ({ title }) => title,
      },
      updatedAt: {
        type: GraphQLString,
        description: 'The update date of the page.',
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

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
      meta: {
        type: PageMetaType,
        description: 'The frontmatter metadata of the page.',
        resolve: ({ meta }) => meta,
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
      slug: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The page slug.',
        resolve: ({ slug }) => slug,
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
