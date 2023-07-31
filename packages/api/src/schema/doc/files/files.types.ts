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
  DocFileCreateErrors,
  DocFileCreatePayload,
  DocFileDeleteErrors,
  DocFileDeleteResult,
  DocFilePayload,
  DocFileUpdateErrors,
  DocFileUpdatePayload,
} from '../../../types';
import { FrontMatterInputType } from '../../../utils/gql';
import { DocFileType } from '../doc.types';

export const DocFilePayloadType = new GraphQLObjectType<
  DocFilePayload,
  APIContext
>({
  name: 'DocFilePayload',
  description: 'The documentation file payload.',
  fields: {
    file: {
      description: 'The requested documentation file.',
      type: DocFileType,
    },
  },
});

export const DocFileCreateInputType = new GraphQLInputObjectType({
  name: 'DocFileCreateInput',
  description: 'The input to create a new documentation file.',
  fields: {
    contents: {
      description: 'The file contents.',
      type: GraphQLString,
    },
    meta: {
      description: 'The file metadata.',
      type: FrontMatterInputType,
    },
    name: {
      description: 'The file name without extension.',
      type: new GraphQLNonNull(GraphQLString),
    },
    parentPath: {
      description: 'The path where to create the file.',
      type: GraphQLString,
    },
  },
});

const DocFileCreationValidationErrorsType = new GraphQLObjectType<
  DocFileCreateErrors['errors']
>({
  name: 'DocFileCreationValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
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

export const DocFileCreateErrorsType = new GraphQLObjectType<
  DocFileCreateErrors,
  APIContext
>({
  name: 'DocFileCreateErrors',
  description: 'The validation errors when creating a new documentation file.',
  fields: {
    errors: {
      description: 'The validation errors when creating a new doc file.',
      type: DocFileCreationValidationErrorsType,
    },
  },
});

export const DocFileCreateResultType = new GraphQLUnionType({
  name: 'DocFileCreateResult',
  description: 'Either the documentation file data or errors.',
  types: [DocFilePayloadType, DocFileCreateErrorsType],
  resolveType(value: DocFileCreatePayload) {
    if (Object.hasOwn(value, 'errors')) return 'DocFileCreateErrors';

    return 'DocFilePayload';
  },
});

export const DocFileDeleteInputType = new GraphQLInputObjectType({
  name: 'DocFileDeleteInput',
  description: 'The input to delete an existing documentation file.',
  fields: {
    id: {
      description: 'The documentation file id.',
      type: GraphQLString,
    },
    path: {
      description: 'The documentation file path.',
      type: GraphQLString,
    },
  },
});

const DocFileDeleteValidationErrorsType = new GraphQLObjectType<
  DocFileDeleteErrors['errors']
>({
  name: 'DocFileDeleteValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    id: {
      description: 'The validation errors on id argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ id }) => id,
    },
    path: {
      description: 'The validation errors on path argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ path }) => path,
    },
  },
});

export const DocFileDeleteErrorsType = new GraphQLObjectType<
  DocFileDeleteErrors,
  APIContext
>({
  name: 'DocFileDeleteErrors',
  description: 'The errors when deleting a documentation file.',
  fields: {
    errors: {
      description: 'The validation errors when deleting a documentation file.',
      type: DocFileDeleteValidationErrorsType,
    },
  },
});

export const DocFileDeleteResultType = new GraphQLUnionType({
  name: 'DocFileDeleteResult',
  description: 'Either the deleted documentation file or errors.',
  types: [DocFilePayloadType, DocFileDeleteErrorsType],
  resolveType(value: DocFileDeleteResult) {
    if (Object.hasOwn(value, 'errors')) return 'DocFileDeleteErrors';

    return 'DocFilePayload';
  },
});

export const DocFileUpdateInputType = new GraphQLInputObjectType({
  name: 'DocFileUpdateInput',
  description: 'The input to update an existing documentation file.',
  fields: {
    contents: {
      description: 'The file contents.',
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
    meta: {
      description: 'The file metadata.',
      type: FrontMatterInputType,
    },
    parentPath: {
      description: 'The path where to move the file.',
      type: GraphQLString,
    },
  },
});

const DocFileUpdateValidationErrorsType = new GraphQLObjectType<
  DocFileUpdateErrors['errors']
>({
  name: 'DocFileUpdateValidationErrors',
  description: 'The validation errors for each argument.',
  fields: {
    contents: {
      description: 'The validation errors on contents argument.',
      type: new GraphQLList(GraphQLString),
      resolve: ({ contents }) => contents,
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

export const DocFileUpdateErrorsType = new GraphQLObjectType<
  DocFileUpdateErrors,
  APIContext
>({
  name: 'DocFileUpdateErrors',
  description: 'The error when updating a documentation file.',
  fields: {
    errors: {
      description: 'The validation errors when updating a documentation file.',
      type: DocFileUpdateValidationErrorsType,
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
