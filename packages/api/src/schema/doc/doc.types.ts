import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  DocDirectory,
  DocDirectoryContents,
  DocEntry,
  DocEntryParent,
  DocFile,
} from '../../types';
import { FrontMatterMetaType } from '../../utils/gql';

export const DocEntryParentType = new GraphQLObjectType<DocEntryParent>({
  name: 'DocEntryParent',
  description: 'The parent of a documentation entry.',
  fields: () => {
    return {
      id: {
        description: 'The parent id.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ id }) => id,
      },
      meta: {
        description: 'The frontmatter metadata of the parent.',
        type: FrontMatterMetaType,
        resolve: ({ meta }) => meta,
      },
      name: {
        description: 'The filename of the parent.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ name }) => name,
      },
      path: {
        description: 'The path of the parent.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ path }) => path,
      },
      slug: {
        description: 'The slug of the parent.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ slug }) => slug,
      },
    };
  },
});

export const DocFileType = new GraphQLObjectType<DocFile, APIContext>({
  name: 'DocFile',
  description: 'A single documentation file.',
  fields: () => {
    return {
      contents: {
        description: 'The contents of the file.',
        type: GraphQLString,
        resolve: ({ contents }) => contents,
      },
      createdAt: {
        description: 'The creation date of the file.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ createdAt }) => createdAt,
      },
      id: {
        description: 'The id of the file.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ id }) => id,
      },
      meta: {
        description: 'The frontmatter metadata of the file.',
        type: FrontMatterMetaType,
        resolve: ({ meta }) => meta,
      },
      name: {
        description: 'The file filename.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ name }) => name,
      },
      parent: {
        description: 'The parent of the file.',
        type: DocEntryParentType,
        resolve: ({ parent }) => parent,
      },
      path: {
        description: 'The file path.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ path }) => path,
      },
      slug: {
        description: 'The file slug.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ slug }) => slug,
      },
      type: {
        description: 'The documentation entry type.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ type }) => type,
      },
      updatedAt: {
        description: 'The update date of the file.',
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

export const DocDirectoryContentType: GraphQLObjectType<
  DocDirectoryContents,
  APIContext
> = new GraphQLObjectType<DocDirectoryContents, APIContext>({
  name: 'DocDirectoryContent',
  description: 'The contents of a documentation directory.',
  fields: () => {
    return {
      directories: {
        description: 'The subdirectories inside the directory.',
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        type: new GraphQLList(DocDirectoryType),
        resolve: ({ directories }) => directories,
      },
      files: {
        description: 'The files inside the directory.',
        type: new GraphQLList(DocFileType),
        resolve: ({ files }) => files,
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
          description: 'The contents of the directory.',
          type: DocDirectoryContentType,
          resolve: ({ contents }) => contents,
        },
        createdAt: {
          description: 'The creation date of the directory.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ createdAt }) => createdAt,
        },
        id: {
          description: 'The id of the directory.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ id }) => id,
        },
        meta: {
          description: 'The metadata of the directory from meta file.',
          type: FrontMatterMetaType,
          resolve: ({ meta }) => meta,
        },
        name: {
          description: 'The directory filename.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ name }) => name,
        },
        parent: {
          description: 'The parent of the directory.',
          type: DocEntryParentType,
          resolve: ({ parent }) => parent,
        },
        path: {
          description: 'The directory path.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ path }) => path,
        },
        slug: {
          description: 'The directory slug.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ slug }) => slug,
        },
        type: {
          description: 'The documentation entry type.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ type }) => type,
        },
        updatedAt: {
          description: 'The update date of the directory.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ updatedAt }) => updatedAt,
        },
      };
    },
  });

export const DocEntryType = new GraphQLUnionType({
  name: 'DocEntry',
  description: 'A documentation entry: either a regular file or a directory.',
  types: [DocFileType, DocDirectoryType],
  resolveType(value: DocEntry) {
    if (value.type === 'file') return 'DocFile';
    return 'DocDirectory';
  },
});
