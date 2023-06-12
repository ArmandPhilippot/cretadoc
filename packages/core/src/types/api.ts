import type {
  ConnectionInput,
  Page,
  PageConnectionPayload,
  PagePayload,
  QueryInput,
} from '@cretadoc/api';
import type { pageQuery, pagesQuery } from '../services';

export type Queries = typeof pageQuery | typeof pagesQuery;

export type VariablesMap = {
  [pageQuery]: QueryInput<Page>;
  [pagesQuery]: ConnectionInput<Page>;
};

export type DataMap = {
  [pageQuery]: PagePayload;
  [pagesQuery]: PageConnectionPayload;
};

export type APIResponse<Q extends Queries> = {
  data?: DataMap[Q];
  errors?: Array<{ message: string }>;
};
