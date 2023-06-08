import type supertest from 'supertest';
import type { ExpectStatic } from 'vitest';
import type { MatcherResult } from '../../types';

type ExpectedResponse = {
  statusCode: number;
  text: string | RegExp;
};

export type ToRespondWithMatcher = {
  toRespondWith: (expected: ExpectedResponse) => MatcherResult;
};

export function toRespondWith(
  this: ReturnType<ExpectStatic['getState']>,
  response: supertest.Response,
  expected: ExpectedResponse
): MatcherResult {
  let pass = true;

  if (!this.equals(response.statusCode, expected.statusCode)) pass = false;
  if (!response.text.match(expected.text)) pass = false;

  const match = this.isNot ? 'does not match' : 'match';
  const message = () => `Requested URL response ${match}.`;

  return {
    pass,
    message,
    actual: { statusCode: response.statusCode, text: response.text },
    expected,
  };
}
