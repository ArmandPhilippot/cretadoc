import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { createConnectionType, createOrderType } from '../../../utils/gql';
import { PageType } from '../pages.types';

export const PageConnectionType = createConnectionType(PageType);

export const PageOrderFieldType = new GraphQLEnumType({
  name: `PageOrderField`,
  description: 'The ordering field.',
  values: {
    createdAt: {
      value: 'createdAt',
    },
    name: {
      value: 'name',
    },
    updatedAt: {
      value: 'updatedAt',
    },
  },
});

export const PageOrderType = createOrderType(PageType.name, PageOrderFieldType);

export const PageWhereInputType = new GraphQLInputObjectType({
  name: 'PageWhereInput',
  description: 'The arguments for filtering the pages.',
  fields: {
    createdAt: {
      description: 'A substring of the creation date of the page.',
      type: GraphQLString,
    },
    name: {
      description: 'A substring of the page name.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the page.',
      type: GraphQLString,
    },
  },
});
