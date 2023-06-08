import type { ExpectStatic } from 'vitest';
import type { PageInfo } from '../../../src/types/gql';
import type { MatcherResult } from '../../types';

export type ToBePageInfo = {
  toBePageInfo: (expected: PageInfo) => MatcherResult;
};

export function toBePageInfo(
  this: ReturnType<ExpectStatic['getState']>,
  pageInfo: PageInfo,
  expected: PageInfo
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `PageInfo ${match}.`;

  return {
    pass: this.equals(pageInfo, expected),
    message,
    actual: pageInfo,
    expected,
  };
}
