import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import type { APIContext, DocEntry, DocEntryPayload } from '../../../types';
import { DocDirectoryType } from '../directories/directories.types';
import { DocFileType } from '../files/files.types';

export const DocEntryType = new GraphQLUnionType({
  name: 'DocEntry',
  description: 'A documentation entry: either a regular file or a directory.',
  types: [DocFileType, DocDirectoryType],
  resolveType(value: DocEntry) {
    if (value.type === 'file') return 'DocFile';
    return 'DocDirectory';
  },
});

export const DocEntryPayloadType = new GraphQLObjectType<
  DocEntryPayload,
  APIContext
>({
  name: 'DocEntryPayload',
  fields: {
    entry: { type: DocEntryType },
  },
});
