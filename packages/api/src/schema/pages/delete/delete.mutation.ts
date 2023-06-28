import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, PageDeleteInput } from '../../../types';
import { pageDeleteResolver } from './delete.resolver';
import { PageDeleteInputType, PageDeleteResultType } from './delete.types';

export const pageDelete: GraphQLFieldConfig<null, APIContext, PageDeleteInput> =
  {
    type: PageDeleteResultType,
    description: 'Delete an existing page.',
    args: {
      input: {
        description: 'The input to delete an existing page.',
        type: new GraphQLNonNull(PageDeleteInputType),
      },
    },
    resolve: pageDeleteResolver,
  };
