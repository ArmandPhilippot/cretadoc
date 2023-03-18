import type { Nullable } from '@cretadoc/utils';
import type { Page } from '../../../src/types';
import type { MatcherResult, PageWithoutDates } from '../../types';

export type ToBePage = {
  toBePage: (expected: Nullable<PageWithoutDates>) => MatcherResult;
};

export function toBePage(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  page: Nullable<Page>,
  expected: Nullable<PageWithoutDates>
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Page payload ${match}.`;

  if (page === null)
    return {
      message,
      pass: this.equals(page, expected),
      actual: page,
      expected,
    };

  const { createdAt, updatedAt, ...actual } = page;

  return {
    pass: this.equals(actual, expected),
    message,
    actual,
    expected,
  };
}
