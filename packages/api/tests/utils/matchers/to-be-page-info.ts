import type { PageInfo } from '../../../src/types/gql';
import type { MatcherResult } from '../../types';

export type ToBePageInfo = {
  toBePageInfo: (expected: PageInfo) => MatcherResult;
};

export function toBePageInfo(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  pageInfo: PageInfo,
  expected: PageInfo
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `PageInfo ${match}.`;

  const isEndCursorMatch = this.equals(pageInfo.endCursor, expected.endCursor);

  const isHasNextPageMatch = this.equals(
    pageInfo.hasNextPage,
    expected.hasNextPage
  );

  const isHasPreviousPageMatch = this.equals(
    pageInfo.hasPreviousPage,
    expected.hasPreviousPage
  );

  const isStartCursorMatch = this.equals(
    pageInfo.startCursor,
    expected.startCursor
  );

  const isTotalMatch = this.equals(pageInfo.total, expected.total);

  return {
    pass:
      isEndCursorMatch &&
      isHasNextPageMatch &&
      isHasPreviousPageMatch &&
      isStartCursorMatch &&
      isTotalMatch,
    message,
    actual: pageInfo,
    expected,
  };
}
