import type { GraphQLError } from 'graphql';
import type { ExpectStatic } from 'vitest';
import type { APIErrorCode } from '../../../src/types';
import type { MatcherResult } from '../../types';

type APIException = {
  code: APIErrorCode;
  message: string;
};

export type ToContainException = {
  toContainException: (expected: APIException) => MatcherResult;
};

export function toContainException(
  this: ReturnType<ExpectStatic['getState']>,
  errors: GraphQLError[],
  expected: APIException
): MatcherResult {
  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Exception ${match}.`;

  const stringifiedErrors = this.utils.stringify(errors);
  const hasCode = stringifiedErrors.includes(`"code": "${expected.code}"`);
  const hasMessage = stringifiedErrors.includes(expected.message);

  return {
    pass: hasCode && hasMessage,
    message,
    actual: errors,
    expected,
  };
}
