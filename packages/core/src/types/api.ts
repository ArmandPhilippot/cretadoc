import type {
  ConnectionInput,
  Page,
  PageConnectionPayload,
} from '@cretadoc/api';
import type { pagesQuery } from '../services';

export type Queries = typeof pagesQuery;

export type VariablesMap = {
  [pagesQuery]: ConnectionInput<Page>;
};

export type DataMap = {
  [pagesQuery]: PageConnectionPayload;
};

export type APIResponse<Q extends Queries> = {
  data?: DataMap[Q];
  errors?: Array<{ message: string }>;
};
