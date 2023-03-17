import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { createConnectionType, createOrderType } from '../../../../utils/gql';
import { DocFileType } from '../files.types';

export const DocFileConnectionType = createConnectionType(DocFileType);

export const DocFileOrderFieldType = new GraphQLEnumType({
  name: `DocFileOrderField`,
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
    updatedAt: {
      value: 'updatedAt',
    },
  },
});

export const DocFileOrderType = createOrderType(
  DocFileType.name,
  DocFileOrderFieldType
);

export const DocFileWhereInputType = new GraphQLInputObjectType({
  name: 'DocFileWhereInput',
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
    path: {
      description: 'The parent path.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the page.',
      type: GraphQLString,
    },
  },
});
