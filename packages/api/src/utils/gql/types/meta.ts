import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { Meta } from '../../../types';
import { ALLOWED_STATUS } from '../../constants';

export const FrontMatterMetaStatus = new GraphQLEnumType({
  name: `FrontMatterMetaStatus`,
  description: 'The status: either draft or published.',
  values: {
    draft: {
      description: 'Set the status of the entry as draft.',
      value: ALLOWED_STATUS.DRAFT,
    },
    published: {
      description: 'Set the status of the entry as published.',
      value: ALLOWED_STATUS.PUBLISHED,
    },
  },
});

export const FrontMatterMetaType = new GraphQLObjectType<Meta>({
  name: 'FrontMatterMeta',
  description: 'The metadata from front matter.',
  fields: () => {
    return {
      createdAt: {
        type: GraphQLString,
        description: 'The creation date.',
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
        type: FrontMatterMetaStatus,
        description: 'The status: either draft or published.',
        resolve: ({ status }) => status,
      },
      title: {
        type: GraphQLString,
        description: 'A user-friendly title.',
        resolve: ({ title }) => title,
      },
      updatedAt: {
        type: GraphQLString,
        description: 'The last modification date.',
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

export const FrontMatterInputType = new GraphQLInputObjectType({
  name: 'FrontMatterInput',
  description: 'The metadata to put in front matter block.',
  fields: {
    createdAt: {
      type: GraphQLString,
      description: 'The creation date.',
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
      type: FrontMatterMetaStatus,
      description: 'The status: either draft or published.',
    },
    title: {
      type: GraphQLString,
      description: 'A user-friendly title.',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The last modification date.',
    },
  },
});
