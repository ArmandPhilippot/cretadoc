import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  DocDirectoryCreateInput,
  DocDirectoryDeleteInput,
  DocDirectoryUpdateInput,
} from '../../../types';
import {
  DocDirectoryCreateInputType,
  DocDirectoryCreateResultType,
  DocDirectoryDeleteInputType,
  DocDirectoryDeleteResultType,
  DocDirectoryUpdateInputType,
  DocDirectoryUpdateResultType,
} from './directories.types';
import {
  resolveDocDirectoryCreate,
  resolveDocDirectoryDelete,
  resolveDocDirectoryUpdate,
} from './resolvers';

const docDirectoryCreate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryCreateInput
> = {
  type: DocDirectoryCreateResultType,
  description: 'Create a new documentation directory.',
  args: {
    input: {
      description: 'The input to create a new doc directory.',
      type: new GraphQLNonNull(DocDirectoryCreateInputType),
    },
  },
  resolve: resolveDocDirectoryCreate,
};

const docDirectoryDelete: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryDeleteInput
> = {
  type: DocDirectoryDeleteResultType,
  description: 'Delete an existing documentation directory.',
  args: {
    input: {
      description: 'The input to delete an existing doc directory.',
      type: new GraphQLNonNull(DocDirectoryDeleteInputType),
    },
  },
  resolve: resolveDocDirectoryDelete,
};

const docDirectoryUpdate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryUpdateInput
> = {
  type: DocDirectoryUpdateResultType,
  description: 'Update an existing documentation directory.',
  args: {
    input: {
      description: 'The input to update an existing doc directory.',
      type: new GraphQLNonNull(DocDirectoryUpdateInputType),
    },
  },
  resolve: resolveDocDirectoryUpdate,
};

export const docDirectoriesMutations = {
  docDirectoryCreate,
  docDirectoryDelete,
  docDirectoryUpdate,
};
