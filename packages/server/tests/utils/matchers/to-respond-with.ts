import request from 'supertest';
import type { ServerReturn } from '../../../src/types';
import type { MatcherResult } from '../../types';

type ExpectedResponse = {
  statusCode: number;
  text: string | RegExp;
  textShouldMatch?: boolean;
};

export type ToRespondWithMatcher = {
  toRespondWith: (expected: ExpectedResponse) => Promise<MatcherResult>;
};

const isExpectedText = (received: string, expected: ExpectedResponse) => {
  const shouldMatch =
    expected.textShouldMatch === undefined || expected.textShouldMatch;
  const isMatching = !!received.match(expected.text)?.length;

  if ((shouldMatch && isMatching) || (!shouldMatch && !isMatching)) return true;
  return false;
};

export async function toRespondWith(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  { server, endpoint }: { server: ServerReturn; endpoint?: string },
  expected: ExpectedResponse
): Promise<MatcherResult> {
  server.start();

  const path = endpoint ?? '/';
  const response = await request(
    `http://${server.config.hostname}:${server.config.port}`
  ).get(path);
  let pass = true;

  if (!this.equals(response.statusCode, expected.statusCode)) pass = false;
  if (!isExpectedText(response.text, expected)) pass = false;

  server.stop();

  const match = this.isNot ? 'does not match' : 'match';
  const message = () => `Requested URL response ${match}.`;

  return {
    pass,
    message,
    actual: { statusCode: response.statusCode, text: response.text },
    expected,
  };
}
