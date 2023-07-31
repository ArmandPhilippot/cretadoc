import { GraphQLObjectType } from 'graphql';
import type { APIContext, DocEntryPayload } from '../../../types';
import { DocEntryType } from '../doc.types';

export const DocEntryPayloadType = new GraphQLObjectType<
  DocEntryPayload,
  APIContext
>({
  name: 'DocEntryPayload',
  description: 'The documentation entry payload.',
  fields: {
    entry: {
      description: 'The requested documentation entry.',
      type: DocEntryType,
    },
  },
});
