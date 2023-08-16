import type {
  ConnectionInput,
  DocEntry,
  DocEntryConnectionPayload,
  DocEntryPayload,
  DocPayload,
  Page,
  PageConnectionPayload,
  PagePayload,
  Payload,
  QueryInput,
} from '@cretadoc/api';
import type { NullableOptionalKeysOf } from '@cretadoc/utils';
import type {
  docEntriesQuery,
  docEntryMetaQuery,
  docEntryQuery,
  pageMetaQuery,
  pageQuery,
  pagesQuery,
} from '../services';

export type Queries =
  | typeof docEntriesQuery
  | typeof docEntryMetaQuery
  | typeof docEntryQuery
  | typeof pageQuery
  | typeof pageMetaQuery
  | typeof pagesQuery;

export type VariablesMap = {
  [docEntriesQuery]: ConnectionInput<DocEntry>;
  [docEntryMetaQuery]: QueryInput<DocEntry>;
  [docEntryQuery]: QueryInput<DocEntry>;
  [pageQuery]: QueryInput<Page>;
  [pageMetaQuery]: QueryInput<Page>;
  [pagesQuery]: ConnectionInput<Page>;
};

type DocMetaPayload<T> = Payload<'doc', T>;
type DocEntryMetaPayload = DocMetaPayload<
  Payload<
    'entry',
    NullableOptionalKeysOf<Pick<DocEntry, 'excerpt' | 'meta' | 'name'>, true>
  >
>;
type PageMetaPayload = Payload<
  'page',
  NullableOptionalKeysOf<Pick<Page, 'excerpt' | 'meta' | 'name'>>
>;

export type DataMap = {
  [docEntriesQuery]: DocPayload<DocEntryConnectionPayload>;
  [docEntryMetaQuery]: DocEntryMetaPayload;
  [docEntryQuery]: DocPayload<DocEntryPayload>;
  [pageQuery]: PagePayload;
  [pageMetaQuery]: PageMetaPayload;
  [pagesQuery]: PageConnectionPayload;
};

export type APIResponse<Q extends Queries> = {
  data?: DataMap[Q];
  errors?: Array<{ message: string }>;
};
