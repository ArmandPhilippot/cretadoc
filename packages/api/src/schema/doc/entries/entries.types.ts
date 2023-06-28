import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type { APIContext, DocEntryPayload } from '../../../types';
import { createConnectionType, createOrderByType } from '../../../utils/gql';
import { DocEntryType } from '../doc.types';

export const DocEntryPayloadType = new GraphQLObjectType<
  DocEntryPayload,
  APIContext
>({
  name: 'DocEntryPayload',
  description: 'The documentation entry payload.',
  fields: {
    entry: {
      description: 'The requested documentation entry.',
      type: DocEntryType,
    },
  },
});

export const DocEntryConnectionType = createConnectionType(DocEntryType);

const DocEntryOrderFieldType = new GraphQLEnumType({
  name: `DocEntryOrderField`,
  description: 'The ordering field.',
  values: {
    createdAt: {
      value: 'createdAt',
      description: 'Order documentation entries by creation date.',
    },
    name: {
      value: 'name',
      description: 'Order documentation entries by name.',
    },
    path: {
      value: 'path',
      description: 'Order documentation entries by path.',
    },
    slug: {
      value: 'slug',
      description: 'Order documentation entries by slug.',
    },
    updatedAt: {
      value: 'updatedAt',
      description: 'Order documentation entries by last modification date.',
    },
  },
});

export const DocEntryOrderByInputType = createOrderByType(
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
