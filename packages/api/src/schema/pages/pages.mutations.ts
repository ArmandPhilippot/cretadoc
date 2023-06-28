import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type {
  APIContext,
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '../../types';
import {
  PageCreateInputType,
  PageCreateResultType,
  PageDeleteInputType,
  PageDeleteResultType,
  PageUpdateInputType,
  PageUpdateResultType,
} from './pages.types';
import {
  resolvePageCreate,
  resolvePageDelete,
  resolvePageUpdate,
} from './resolvers';

const pageCreate: GraphQLFieldConfig<null, APIContext, PageCreateInput> = {
  type: PageCreateResultType,
  description: 'Create a new page.',
  args: {
    input: {
      description: 'The input to create a new page.',
      type: new GraphQLNonNull(PageCreateInputType),
    },
  },
  resolve: resolvePageCreate,
};

const pageDelete: GraphQLFieldConfig<null, APIContext, PageDeleteInput> = {
  type: PageDeleteResultType,
  description: 'Delete an existing page.',
  args: {
    input: {
      description: 'The input to delete an existing page.',
      type: new GraphQLNonNull(PageDeleteInputType),
    },
  },
  resolve: resolvePageDelete,
};

const pageUpdate: GraphQLFieldConfig<null, APIContext, PageUpdateInput> = {
  type: PageUpdateResultType,
  description: 'Update an existing page.',
  args: {
    input: {
      description: 'The input to update an existing page.',
      type: new GraphQLNonNull(PageUpdateInputType),
    },
  },
  resolve: resolvePageUpdate,
};

export const pagesMutations = { pageCreate, pageDelete, pageUpdate };
