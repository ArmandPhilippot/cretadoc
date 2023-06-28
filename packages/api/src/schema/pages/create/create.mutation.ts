import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, PageCreateInput } from '../../../types';
import { pageCreateResolver } from './create.resolver';
import { PageCreateInputType, PageCreateResultType } from './create.types';

export const pageCreate: GraphQLFieldConfig<null, APIContext, PageCreateInput> =
  {
    type: PageCreateResultType,
    description: 'Create a new page.',
    args: {
      input: {
        description: 'The input to create a new page.',
        type: new GraphQLNonNull(PageCreateInputType),
      },
    },
    resolve: pageCreateResolver,
  };
