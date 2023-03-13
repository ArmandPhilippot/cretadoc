import type { Nullable } from '@cretadoc/utils';

export type Edge<T> = {
  node: T;
  cursor: string;
};

export type PageInfo = {
  endCursor: Nullable<string>;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: Nullable<string>;
  total?: number;
};

export type Connection<T> = {
  edges?: Array<Edge<T>>;
  pageInfo?: PageInfo;
};

export type QueryResult<T> = {
  data: T;
};
