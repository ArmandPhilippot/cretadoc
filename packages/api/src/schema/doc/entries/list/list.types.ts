import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { createConnectionType, createOrderType } from '../../../../utils/gql';
import { DocEntryType } from '../entries.types';

export const DocEntryConnectionType = createConnectionType(DocEntryType);

export const DocEntryOrderFieldType = new GraphQLEnumType({
  name: `DocEntryOrderField`,
  description: 'The ordering field.',
  values: {
    createdAt: {
      value: 'createdAt',
    },
    name: {
      value: 'name',
    },
    path: {
      value: 'path',
    },
    slug: {
      value: 'slug',
    },
    updatedAt: {
      value: 'updatedAt',
    },
  },
});

export const DocEntryOrderType = createOrderType(
  DocEntryType.name,
  DocEntryOrderFieldType
);

export const DocEntryWhereInputType = new GraphQLInputObjectType({
  name: 'DocEntryWhereInput',
  description: 'The arguments for filtering the entries.',
  fields: {
    createdAt: {
      description: 'A substring of the creation date of the entry.',
      type: GraphQLString,
    },
    name: {
      description: 'A substring of the entry name.',
      type: GraphQLString,
    },
    path: {
      description: 'The parent path.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the entry.',
      type: GraphQLString,
    },
  },
});
