import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocDirectoryUpdateInput } from '../../../../types';
import { directoryUpdateResolver } from './update.resolver';
import {
  DocDirectoryUpdateInputType,
  DocDirectoryUpdateResultType,
} from './update.types';

export const directoryUpdate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryUpdateInput
> = {
  type: DocDirectoryUpdateResultType,
  description: 'Update an existing documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryUpdateInputType),
    },
  },
  resolve: directoryUpdateResolver,
};
