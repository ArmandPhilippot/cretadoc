import type { Directory, RegularFile } from '@cretadoc/read-dir';
import type { Payload } from '../generics';
import type { QueryResult } from '../gql';
import type { DocFileLoaders, DocFilePayload } from './doc-files';

export type Doc = DocFilePayload;

export type DocEntryParent = Pick<
  Directory | RegularFile,
  'id' | 'name' | 'path'
>;

/*
 * ===========================================================================
 *  Result types
 * ===========================================================================
 */

export type DocPayload = Payload<'doc', Doc>;

export type DocResult = QueryResult<DocPayload>;

/*
 * ===========================================================================
 *  Loaders types
 * ===========================================================================
 */

export type DocLoaders = {
  doc?: DocFileLoaders;
};
