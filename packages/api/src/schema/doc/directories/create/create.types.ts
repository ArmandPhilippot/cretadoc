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
  DocDirectoryCreateErrors,
  DocDirectoryCreatePayload,
} from '../../../../types';
import { DocDirectoryPayloadType } from '../directories.types';

export const DocDirectoryCreateInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryCreateInput',
  description: 'The input to create a new documentation directory.',
  fields: {
    name: {
      description: 'The directory name.',
      type: new GraphQLNonNull(GraphQLString),
    },
    parentPath: {
      description: 'The path where to create the directory.',
      type: GraphQLString,
    },
  },
});

export const DocDirectoryCreateErrorsType = new GraphQLObjectType<
  DocDirectoryCreateErrors,
  APIContext
>({
  name: 'DocDirectoryCreateErrors',
  description:
    'The validation errors when creating a new documentation directory.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocDirectoryCreateErrors['errors']>({
        name: 'DocDirectoryCreateErrorsProperties',
        fields: {
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

export const DocDirectoryCreateResultType = new GraphQLUnionType({
  name: 'DocDirectoryCreateResult',
  description: 'Either the documentation directory data or errors.',
  types: [DocDirectoryPayloadType, DocDirectoryCreateErrorsType],
  resolveType(value: DocDirectoryCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'DocDirectoryCreateErrors';

    return 'DocDirectoryPayload';
  },
});
