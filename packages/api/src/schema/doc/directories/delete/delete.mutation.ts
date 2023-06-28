import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocDirectoryDeleteInput } from '../../../../types';
import { directoryDeleteResolver } from './delete.resolver';
import {
  DocDirectoryDeleteInputType,
  DocDirectoryDeleteResultType,
} from './delete.types';

export const directoryDelete: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryDeleteInput
> = {
  type: DocDirectoryDeleteResultType,
  description: 'Delete an existing documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryDeleteInputType),
    },
  },
  resolve: directoryDeleteResolver,
};
