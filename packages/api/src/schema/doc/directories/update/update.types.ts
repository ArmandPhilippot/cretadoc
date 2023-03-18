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
  DocDirectoryUpdateErrors,
  DocDirectoryUpdatePayload,
} from '../../../../types';
import { DocDirectoryPayloadType } from '../directories.types';

export const DocDirectoryUpdateInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryUpdateInput',
  description: 'The input to update an existing documentation directory.',
  fields: {
    id: {
      description: 'The directory id.',
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      description: 'The new directory name.',
      type: GraphQLString,
    },
    parentPath: {
      description: 'The path where to move the directory.',
      type: GraphQLString,
    },
  },
});

export const DocDirectoryUpdateErrorsType = new GraphQLObjectType<
  DocDirectoryUpdateErrors,
  APIContext
>({
  name: 'DocDirectoryUpdateErrors',
  description: 'The error when updating a documentation directory.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocDirectoryUpdateErrors['errors']>({
        name: 'DocDirectoryUpdateErrorsProperties',
        fields: {
          id: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ id }) => id,
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

export const DocDirectoryUpdateResultType = new GraphQLUnionType({
  name: 'DocDirectoryUpdateResult',
  description: 'Either the updated documentation directory or errors.',
  types: [DocDirectoryPayloadType, DocDirectoryUpdateErrorsType],
  resolveType(value: DocDirectoryUpdatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'DocDirectoryUpdateErrors';

    return 'DocDirectoryPayload';
  },
});
