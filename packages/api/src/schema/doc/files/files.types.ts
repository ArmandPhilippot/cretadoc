import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import type {
  APIContext,
  DocEntryParent,
  DocFile,
  DocFilePayload,
} from '../../../types';

export const DocFileParentType = new GraphQLObjectType<DocEntryParent>({
  name: 'DocFileParent',
  description: 'The parent of a documentation file.',
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The parent id.',
        resolve: ({ id }) => id,
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The filename of the parent.',
        resolve: ({ name }) => name,
      },
      path: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The path of the parent.',
        resolve: ({ path }) => path,
      },
    };
  },
});

export const DocFileType = new GraphQLObjectType<DocFile, APIContext>({
  name: 'DocFile',
  description: 'A single documentation file.',
  fields: () => {
    return {
      content: {
        type: GraphQLString,
        description: 'The content of the file.',
        resolve: ({ content }) => content,
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The creation date of the file.',
        resolve: ({ createdAt }) => createdAt,
      },
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The id of the file.',
        resolve: ({ id }) => id,
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The file filename.',
        resolve: ({ name }) => name,
      },
      parent: {
        type: DocFileParentType,
        description: 'The parent of the file.',
        resolve: ({ parent }) => parent,
      },
      path: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The file path.',
        resolve: ({ path }) => path,
      },
      type: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The documentation entry type.',
        resolve: ({ type }) => type,
      },
      updatedAt: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The update date of the file.',
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

export const DocFilePayloadType = new GraphQLObjectType<
  DocFilePayload,
  APIContext
>({
  name: 'DocFilePayload',
  fields: {
    file: { type: DocFileType },
  },
});
