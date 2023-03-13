import type { GraphQLError } from 'graphql';
import type { PagePayload, QueryResult } from '../../src/types';

export type GraphQLErrors = {
  errors: GraphQLError[];
};

type ReplaceObjValuesWith<T extends object, V> = {
  [K in keyof T]: V;
};

export type QueryResultWithErrors<T extends object> = QueryResult<
  ReplaceObjValuesWith<T, null>
> &
  GraphQLErrors;

export type MatcherResult = {
  pass: boolean;
  message: () => string;
  actual?: unknown;
  expected?: unknown;
};

export type PageWithoutDates = Omit<
  NonNullable<PagePayload['page']>,
  'createdAt' | 'updatedAt'
>;
