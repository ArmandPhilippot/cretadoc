import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
} from 'graphql';
import type {
  APIContext,
  DocDirectoryPayload,
  DocDirectoryCreateErrors,
  DocDirectoryCreatePayload,
  DocDirectoryDeleteResult,
  DocDirectoryDeleteErrors,
  DocDirectoryUpdatePayload,
  DocDirectoryUpdateErrors,
} from '../../../types';
import { FrontMatterInputType } from '../../../utils/gql';
import { DocDirectoryType } from '../doc.types';

export const DocDirectoryPayloadType = new GraphQLObjectType<
  DocDirectoryPayload,
  APIContext
>({
  name: 'DocDirectoryPayload',
  description: 'The documentation directory payload.',
  fields: {
    directory: {
      description: 'The requested documentation directory.',
      type: DocDirectoryType,
    },
  },
});

export const DocDirectoryCreateInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryCreateInput',
  description: 'The input to create a new documentation directory.',
  fields: {
    contents: {
      description: 'The directory text contents.',
      type: GraphQLString,
    },
    excerpt: {
      description: 'The directory excerpt.',
      type: GraphQLString,
    },
    meta: {
      description: 'The directory metadata.',
      type: FrontMatterInputType,
    },
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

const DocDirectoryCreateValidationErrorsType = new GraphQLObjectType<
  DocDirectoryCreateErrors['errors']
>({
  name: 'DocDirectoryCreateValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
    },
    excerpt: {
      description: 'The validation errors on excerpt argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ excerpt }) => excerpt,
    },
    meta: {
      description: 'The validation errors on meta argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ meta }) => meta,
    },
    name: {
      description: 'The validation errors on name argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ name }) => name,
    },
    parentPath: {
      description: 'The validation errors on parentPath argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ parentPath }) => parentPath,
    },
  },
});

export const DocDirectoryCreateErrorsType = new GraphQLObjectType<
  DocDirectoryCreateErrors,
  APIContext
>({
  name: 'DocDirectoryCreateErrors',
  description: 'The errors when creating a new documentation directory.',
  fields: {
    errors: {
      description: 'The validation errors when creating a new doc directory.',
      type: DocDirectoryCreateValidationErrorsType,
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

const DocDirectoryDeleteValidationErrorsType = new GraphQLObjectType<
  DocDirectoryDeleteErrors['errors']
>({
  name: 'DocDirectoryDeleteValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    id: {
      description: 'The validation errors on id argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ id }) => id,
    },
    onlyEmpty: {
      description: 'The validation errors on onlyEmpty argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ onlyEmpty }) => onlyEmpty,
    },
    path: {
      description: 'The validation errors on path argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ path }) => path,
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
      description: 'The validation errors when deleting a doc directory.',
      type: DocDirectoryDeleteValidationErrorsType,
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

export const DocDirectoryUpdateInputType = new GraphQLInputObjectType({
  name: 'DocDirectoryUpdateInput',
  description: 'The input to update an existing documentation directory.',
  fields: {
    contents: {
      description: 'The directory text contents.',
      type: GraphQLString,
    },
    excerpt: {
      description: 'The directory excerpt.',
      type: GraphQLString,
    },
    id: {
      description: 'The id of the directory to update.',
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      description: 'The directory metadata.',
      type: FrontMatterInputType,
    },
    name: {
      description: 'A new directory name.',
      type: GraphQLString,
    },
    parentPath: {
      description: 'A path where to move the directory.',
      type: GraphQLString,
    },
  },
});

const DocDirectoryUpdateValidationErrorsType = new GraphQLObjectType<
  DocDirectoryUpdateErrors['errors']
>({
  name: 'DocDirectoryUpdateValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
    },
    excerpt: {
      description: 'The validation errors on excerpt argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ excerpt }) => excerpt,
    },
    id: {
      description: 'The validation errors on id argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ id }) => id,
    },
    meta: {
      description: 'The validation errors on meta argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ meta }) => meta,
    },
    name: {
      description: 'The validation errors on name argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ name }) => name,
    },
    parentPath: {
      description: 'The validation errors on parentPath argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ parentPath }) => parentPath,
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
      description: 'The validation errors when updating a doc directory.',
      type: DocDirectoryUpdateValidationErrorsType,
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
