import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { createConnectionType, createOrderType } from '../../../../utils/gql';
import { DocDirectoryType } from '../directories.types';

export const DocDirectoryConnectionType =
  createConnectionType(DocDirectoryType);

export const DocDirectoryOrderFieldType = new GraphQLEnumType({
  name: `DocDirectoryOrderField`,
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

export const DocDirectoryOrderType = createOrderType(
  DocDirectoryType.name,
  DocDirectoryOrderFieldType
);

export const DocDirectoryWhereInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryWhereInput',
  description: 'The arguments for filtering the directories.',
  fields: {
    createdAt: {
      description: 'A substring of the creation date of the directory.',
      type: GraphQLString,
    },
    name: {
      description: 'A substring of the directory name.',
      type: GraphQLString,
    },
    path: {
      description: 'The parent path.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the directory.',
      type: GraphQLString,
    },
  },
});
