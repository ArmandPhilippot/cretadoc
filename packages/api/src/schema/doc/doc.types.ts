import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  DocDirectory,
  DocEntry,
  DocEntryParent,
  DocFile,
} from '../../types';
import {
  FrontMatterMetaType,
  createConnectionType,
  createOrderByType,
  getConnectionArgs,
} from '../../utils/gql';

const DocOrderFieldType = new GraphQLEnumType({
  name: `DocOrderField`,
  description: 'The field to order the documentation entries.',
  values: {
    createdAt: {
      value: 'createdAt',
      description: 'Order documentation entries by creation date.',
    },
    name: {
      value: 'name',
      description: 'Order documentation entries by name.',
    },
    path: {
      value: 'path',
      description: 'Order documentation entries by path.',
    },
    slug: {
      value: 'slug',
      description: 'Order documentation entries by slug.',
    },
    updatedAt: {
      value: 'updatedAt',
      description: 'Order documentation entries by last modification date.',
    },
  },
});

export const DocOrderByInputType = createOrderByType('Doc', DocOrderFieldType);

export const DocWhereInputType = new GraphQLInputObjectType({
  name: 'DocWhereInput',
  description: 'The arguments for filtering the documentation entries.',
  fields: {
    createdAt: {
      description: 'A substring of the creation date of the entry.',
      type: GraphQLString,
    },
    name: {
      description: 'A substring of the entry name.',
      type: GraphQLString,
    },
    path: {
      description: 'The parent path.',
      type: GraphQLString,
    },
    type: {
      description: 'The entry type.',
      type: GraphQLString,
    },
    slug: {
      description: 'The parent slug.',
      type: GraphQLString,
    },
    updatedAt: {
      description: 'A substring of the last update date of the entry.',
      type: GraphQLString,
    },
  },
});

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
      excerpt: {
        description: 'The excerpt of the file.',
        type: GraphQLString,
        resolve: ({ excerpt }) => excerpt,
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

export const DocFileConnectionType = createConnectionType(DocFileType);

export const DocDirectoryType: GraphQLObjectType<DocDirectory, APIContext> =
  new GraphQLObjectType<DocDirectory, APIContext>({
    name: 'DocDirectory',
    description: 'A single documentation directory.',
    fields: () => {
      return {
        contents: {
          description: 'The text content of the directory.',
          type: GraphQLString,
          resolve: ({ contents }) => contents,
        },
        createdAt: {
          description: 'The creation date of the directory.',
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ createdAt }) => createdAt,
        },
        entries: {
          description: 'The entries inside the directory.',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          type: DocEntryConnectionType,
          args: getConnectionArgs({
            orderBy: DocOrderByInputType,
            where: DocWhereInputType,
          }),
          resolve: ({ entries }) => entries,
        },
        excerpt: {
          description: 'The excerpt of the directory.',
          type: GraphQLString,
          resolve: ({ excerpt }) => excerpt,
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

export const DocDirectoryConnectionType =
  createConnectionType(DocDirectoryType);

export const DocEntryType = new GraphQLUnionType({
  name: 'DocEntry',
  description: 'A documentation entry: either a regular file or a directory.',
  types: [DocFileType, DocDirectoryType],
  resolveType(value: DocEntry) {
    if (value.type === 'file') return 'DocFile';
    return 'DocDirectory';
  },
});

export const DocEntryConnectionType = createConnectionType(DocEntryType);
