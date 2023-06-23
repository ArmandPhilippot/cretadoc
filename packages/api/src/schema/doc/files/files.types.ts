import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import type {
  APIContext,
  DocEntryParent,
  DocFile,
  DocFilePayload,
  Meta,
} from '../../../types';

export const DocFileMetaType = new GraphQLObjectType<Meta>({
  name: 'DocFileMeta',
  description: 'The metadata of a documentation file.',
  fields: () => {
    return {
      createdAt: {
        type: GraphQLString,
        description: 'The creation date of the file.',
        resolve: ({ createdAt }) => createdAt,
      },
      seoDescription: {
        type: GraphQLString,
        description: 'The meta description.',
        resolve: ({ seoDescription }) => seoDescription,
      },
      seoTitle: {
        type: GraphQLString,
        description: 'The title used by search engines.',
        resolve: ({ seoTitle }) => seoTitle,
      },
      status: {
        type: GraphQLString,
        description: 'The status of the file.',
        resolve: ({ status }) => status,
      },
      title: {
        type: GraphQLString,
        description: 'The title of the file.',
        resolve: ({ title }) => title,
      },
      updatedAt: {
        type: GraphQLString,
        description: 'The update date of the file.',
        resolve: ({ updatedAt }) => updatedAt,
      },
    };
  },
});

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
      slug: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The slug of the parent.',
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
        type: GraphQLString,
        description: 'The contents of the file.',
        resolve: ({ contents }) => contents,
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
      meta: {
        type: DocFileMetaType,
        description: 'The frontmatter metadata of the file.',
        resolve: ({ meta }) => meta,
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
      slug: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The file slug.',
        resolve: ({ slug }) => slug,
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
