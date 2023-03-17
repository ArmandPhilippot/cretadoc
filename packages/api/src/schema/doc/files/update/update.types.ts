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
  DocFileUpdateErrors,
  DocFileUpdatePayload,
} from '../../../../types';
import { DocFilePayloadType } from '../files.types';

export const DocFileUpdateInputType = new GraphQLInputObjectType({
  name: 'DocFileUpdateInput',
  description: 'The input to update an existing documentation file.',
  fields: {
    content: {
      description: 'The file content.',
      type: GraphQLString,
    },
    id: {
      description: 'The file id.',
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      description: 'The file name without extension.',
      type: GraphQLString,
    },
    parentPath: {
      description: 'The path where to move the file.',
      type: GraphQLString,
    },
  },
});

export const DocFileUpdateErrorsType = new GraphQLObjectType<
  DocFileUpdateErrors,
  APIContext
>({
  name: 'DocFileUpdateErrors',
  description: 'The error when updating a documentation file.',
  fields: {
    errors: {
      type: new GraphQLObjectType<DocFileUpdateErrors['errors']>({
        name: 'DocFileUpdateErrorsProperties',
        fields: {
          content: {
            type: new GraphQLList(GraphQLString),
            resolve: ({ content }) => content,
          },
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

export const DocFileUpdateResultType = new GraphQLUnionType({
  name: 'DocFileUpdateResult',
  description: 'Either the updated documentation file or errors.',
  types: [DocFilePayloadType, DocFileUpdateErrorsType],
  resolveType(value: DocFileUpdatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'DocFileUpdateErrors';

    return 'DocFilePayload';
  },
});
