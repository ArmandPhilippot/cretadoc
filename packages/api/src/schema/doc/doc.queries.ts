import type { GraphQLFieldConfig } from 'graphql';
import type { APIContext } from '../../types';
import { DocType } from './doc.types';

export const doc: GraphQLFieldConfig<null, APIContext, null> = {
  type: DocType,
  description: 'Return the documentation nodes.',

  resolve: () => true,
};
