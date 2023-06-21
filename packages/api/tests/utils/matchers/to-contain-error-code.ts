import type { GraphQLError } from 'graphql';
import type { ExpectStatic } from 'vitest';
import type { APIErrorCode } from '../../../src/types';
import type { MatcherResult } from '../../types';

export type ToContainErrorCode = {
  toContainErrorCode: (expected: APIErrorCode) => MatcherResult;
};

export function toContainErrorCode(
  this: ReturnType<ExpectStatic['getState']>,
  errors: GraphQLError[],
  expected: APIErrorCode
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Error code ${match}.`;

  const stringifiedErrors = this.utils.stringify(errors);

  return {
    pass: stringifiedErrors.includes(`"code": "${expected}"`),
    message,
    actual: errors,
    expected,
  };
}
