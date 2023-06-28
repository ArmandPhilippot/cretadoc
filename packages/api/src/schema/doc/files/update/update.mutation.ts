import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocFileUpdateInput } from '../../../../types';
import { fileUpdateResolver } from './update.resolver';
import {
  DocFileUpdateInputType,
  DocFileUpdateResultType,
} from './update.types';

export const fileUpdate: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileUpdateInput
> = {
  type: DocFileUpdateResultType,
  description: 'Update an existing documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileUpdateInputType),
    },
  },
  resolve: fileUpdateResolver,
};
