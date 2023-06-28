import { type GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import type { APIContext, DocFileCreateInput } from '../../../../types';
import { fileCreateResolver } from './create.resolver';
import {
  DocFileCreateInputType,
  DocFileCreateResultType,
} from './create.types';

export const fileCreate: GraphQLFieldConfig<
  null,
  APIContext,
  DocFileCreateInput
> = {
  type: DocFileCreateResultType,
  description: 'Create a new documentation file.',
  args: {
    input: {
      type: new GraphQLNonNull(DocFileCreateInputType),
    },
  },
  resolve: fileCreateResolver,
};
