import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocFileDeleteInput } from '../../../../types';
import { fileDeleteResolver } from './delete.resolver';
import {
  DocFileDeleteInputType,
  DocFileDeleteResultType,
} from './delete.types';

export const fileDelete: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileDeleteInput
> = {
  type: DocFileDeleteResultType,
  description: 'Delete an existing documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileDeleteInputType),
    },
  },
  resolve: fileDeleteResolver,
};
