import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocDirectoryCreateInput } from '../../../../types';
import { directoryCreateResolver } from './create.resolver';
import {
  DocDirectoryCreateInputType,
  DocDirectoryCreateResultType,
} from './create.types';

export const directoryCreate: GraphQLFieldConfig<
  null,
  APIContext,
  DocDirectoryCreateInput
> = {
  type: DocDirectoryCreateResultType,
  description: 'Create a new documentation directory.',
  args: {
    input: {
      type: new GraphQLNonNull(DocDirectoryCreateInputType),
    },
  },
  resolve: directoryCreateResolver,
};
