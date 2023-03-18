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
  DocFileCreateErrors,
  DocFileCreatePayload,
} from '../../../../types';
import { DocFilePayloadType } from '../files.types';

export const DocFileCreateInputType = new GraphQLInputObjectType({
  name: 'DocFileCreateInput',
  description: 'The input to create a new documentation file.',
  fields: {
    content: {
      description: 'The file content.',
      type: GraphQLString,
    },
    name: {
      description: 'The file name without extension.',
      type: new GraphQLNonNull(GraphQLString),
    },
    parentPath: {
      description: 'The path where to create the file.',
      type: GraphQLString,
    },
  },
});

export const DocFileCreateErrorsType = new GraphQLObjectType<
  DocFileCreateErrors,
  APIContext
>({
  name: 'DocFileCreateErrors',
  description: 'The validation errors when creating a new documentation file.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocFileCreateErrors['errors']>({
        name: 'DocFileCreateErrorsProperties',
        fields: {
          content: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ content }) => content,
          },
          name: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ name }) => name,
          },
          parentPath: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ parentPath }) => parentPath,
          },
        },
      }),
    },
  },
});

export const DocFileCreateResultType = new GraphQLUnionType({
  name: 'DocFileCreateResult',
  description: 'Either the documentation file data or errors.',
  types: [DocFilePayloadType, DocFileCreateErrorsType],
  resolveType(value: DocFileCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'DocFileCreateErrors';

    return 'DocFilePayload';
  },
});