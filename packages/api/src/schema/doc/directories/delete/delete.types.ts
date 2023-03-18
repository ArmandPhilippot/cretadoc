import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  DocDirectoryDeleteErrors,
  DocDirectoryDeleteResult,
} from '../../../../types';
import { DocDirectoryPayloadType } from '../directories.types';

export const DocDirectoryDeleteInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryDeleteInput',
  description: 'The input to delete an existing documentation directory.',
  fields: {
    id: {
      description: 'The documentation directory id.',
      type: GraphQLString,
    },
    onlyEmpty: {
      description: 'Should we delete only empty directories?',
      defaultValue: true,
      type: GraphQLBoolean,
    },
    path: {
      description: 'The documentation directory path.',
      type: GraphQLString,
    },
  },
});

export const DocDirectoryDeleteErrorsType = new GraphQLObjectType<
  DocDirectoryDeleteErrors,
  APIContext
>({
  name: 'DocDirectoryDeleteErrors',
  description: 'The errors when deleting a documentation directory.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocDirectoryDeleteErrors['errors']>({
        name: 'DocDirectoryDeleteErrorsProperties',
        fields: {
          id: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ id }) => id,
          },
          onlyEmpty: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ onlyEmpty }) => onlyEmpty,
          },
          path: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ path }) => path,
          },
        },
      }),
    },
  },
});

export const DocDirectoryDeleteResultType = new GraphQLUnionType({
  name: 'DocDirectoryDeleteResult',
  description: 'Either the deleted documentation directory or errors.',
  types: [DocDirectoryPayloadType, DocDirectoryDeleteErrorsType],
  resolveType(value: DocDirectoryDeleteResult) {
    if (Object.hasOwn(value, 'errors')) return 'DocDirectoryDeleteErrors';

    return 'DocDirectoryPayload';
  },
});
