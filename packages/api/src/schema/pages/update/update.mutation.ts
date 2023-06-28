import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, PageUpdateInput } from '../../../types';
import { pageUpdateResolver } from './update.resolver';
import { PageUpdateInputType, PageUpdateResultType } from './update.types';

export const pageUpdate: GraphQLFieldConfig<null, APIContext, PageUpdateInput> =
  {
    type: PageUpdateResultType,
    description: 'Update an existing page.',
    args: {
      input: {
        description: 'The input to update an existing page.',
        type: new GraphQLNonNull(PageUpdateInputType),
      },
    },
    resolve: pageUpdateResolver,
  };
