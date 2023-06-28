import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocFileCreateInput,
  DocFileDeleteInput,
  DocFileUpdateInput,
} from '../../../types';
import {
  DocFileCreateInputType,
  DocFileCreateResultType,
  DocFileDeleteInputType,
  DocFileDeleteResultType,
  DocFileUpdateInputType,
  DocFileUpdateResultType,
} from './files.types';
import {
  resolveDocFileCreate,
  resolveDocFileDelete,
  resolveDocFileUpdate,
} from './resolvers';

const docFileCreate: GraphQLFieldConfig<null, APIContext, DocFileCreateInput> =
  {
    type: DocFileCreateResultType,
    description: 'Create a new documentation file.',
    args: {
      input: {
        type: new GraphQLNonNull(DocFileCreateInputType),
      },
    },
    resolve: resolveDocFileCreate,
  };

const docFileDelete: GraphQLFieldConfig<null, APIContext, DocFileDeleteInput> =
  {
    type: DocFileDeleteResultType,
    description: 'Delete an existing documentation file.',
    args: {
      input: {
        type: new GraphQLNonNull(DocFileDeleteInputType),
      },
    },
    resolve: resolveDocFileDelete,
  };

const docFileUpdate: GraphQLFieldConfig<null, APIContext, DocFileUpdateInput> =
  {
    type: DocFileUpdateResultType,
    description: 'Update an existing documentation file.',
    args: {
      input: {
        type: new GraphQLNonNull(DocFileUpdateInputType),
      },
    },
    resolve: resolveDocFileUpdate,
  };

export const docFilesMutations = {
  docFileCreate,
  docFileDelete,
  docFileUpdate,
};
