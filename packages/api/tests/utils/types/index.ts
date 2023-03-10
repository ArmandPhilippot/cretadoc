import type { PagePayload } from '../../../src/types';

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
