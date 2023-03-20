import type { DirectoryContents } from '@cretadoc/read-dir';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import type {
  APIContext,
  DocEntryParent,
  DocDirectory,
  DocDirectoryPayload,
} from '../../../types';
import { DocFileType } from '../files/files.types';

export const DocDirectoryContentType: GraphQLObjectType<
  DirectoryContents,
  APIContext
> = new GraphQLObjectType<DirectoryContents, APIContext>({
  name: 'DocDirectoryContent',
  description: 'The contents of a documentation directory.',
  fields: () => {
    return {
      directories: {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        type: new GraphQLList(DocDirectoryType),
        description: 'The subdirectories inside the directory.',
        resolve: ({ directories }) => directories,
      },
      files: {
        type: new GraphQLList(DocFileType),
        description: 'The files inside the directory.',
        resolve: ({ files }) => files,
      },
    };
  },
});

export const DocDirectoryParentType = new GraphQLObjectType<DocEntryParent>({
  name: 'DocDirectoryParent',
  description: 'The parent of a documentation directory.',
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

export const DocDirectoryType: GraphQLObjectType<DocDirectory, APIContext> =
  new GraphQLObjectType<DocDirectory, APIContext>({
    name: 'DocDirectory',
    description: 'A single documentation directory.',
    fields: () => {
      return {
        contents: {
          type: DocDirectoryContentType,
          description: 'The contents of the directory.',
          resolve: ({ contents }) => contents,
        },
        createdAt: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The creation date of the directory.',
          resolve: ({ createdAt }) => createdAt,
        },
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The id of the directory.',
          resolve: ({ id }) => id,
        },
        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The directory filename.',
          resolve: ({ name }) => name,
        },
        parent: {
          type: DocDirectoryParentType,
          description: 'The parent of the directory.',
          resolve: ({ parent }) => parent,
        },
        path: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The directory path.',
          resolve: ({ path }) => path,
        },
        type: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The documentation entry type.',
          resolve: ({ type }) => type,
        },
        updatedAt: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The update date of the directory.',
          resolve: ({ updatedAt }) => updatedAt,
        },
      };
    },
  });

export const DocDirectoryPayloadType = new GraphQLObjectType<
  DocDirectoryPayload,
  APIContext
>({
  name: 'DocDirectoryPayload',
  fields: {
    directory: { type: DocDirectoryType },
  },
});
