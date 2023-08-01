import type {
  ConnectionInput,
  DocEntry,
  DocEntryConnectionPayload,
  DocEntryPayload,
  DocPayload,
  Page,
  PageConnectionPayload,
  PagePayload,
  QueryInput,
} from '@cretadoc/api';
import type {
  docEntriesQuery,
  docEntryQuery,
  pageQuery,
  pagesQuery,
} from '../services';

export type Queries =
  | typeof docEntriesQuery
  | typeof docEntryQuery
  | typeof pageQuery
  | typeof pagesQuery;

export type VariablesMap = {
  [docEntriesQuery]: ConnectionInput<DocEntry>;
  [docEntryQuery]: QueryInput<DocEntry>;
  [pageQuery]: QueryInput<Page>;
  [pagesQuery]: ConnectionInput<Page>;
};

export type DataMap = {
  [docEntriesQuery]: DocPayload<DocEntryConnectionPayload>;
  [docEntryQuery]: DocPayload<DocEntryPayload>;
  [pageQuery]: PagePayload;
  [pagesQuery]: PageConnectionPayload;
};

export type APIResponse<Q extends Queries> = {
  data?: DataMap[Q];
  errors?: Array<{ message: string }>;
};
