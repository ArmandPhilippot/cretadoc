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

export const DocFileMetaInputType = new GraphQLInputObjectType({
  name: 'DocFileMetaInput',
  description: 'The documentation file metadata.',
  fields: {
    createdAt: {
      type: GraphQLString,
      description: 'The creation date of the file.',
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
      description: 'The status of the documentation file.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the documentation file.',
    },
    updatedAt: {
      type: GraphQLString,
      description: 'The update date of the file.',
    },
  },
});

export const DocFileCreateInputType = new GraphQLInputObjectType({
  name: 'DocFileCreateInput',
  description: 'The input to create a new documentation file.',
  fields: {
    contents: {
      description: 'The file contents.',
      type: GraphQLString,
    },
    meta: {
      description: 'The file metadata.',
      type: DocFileMetaInputType,
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
