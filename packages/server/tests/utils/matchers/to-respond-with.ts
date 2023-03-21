import request from 'supertest';
import type { ServerReturn } from '../../../src/types';
import type { MatcherResult } from '../../types';

type ExpectedResponse = {
  statusCode: number;
  text: string | RegExp;
};

export type ToRespondWithMatcher = {
  toRespondWith: (expected: ExpectedResponse) => Promise<MatcherResult>;
};

export async function toRespondWith(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  server: ServerReturn,
  expected: ExpectedResponse
): Promise<MatcherResult> {
  server.start();

  const url = `http://${server.config.hostname}:${server.config.port}`;
  const response = await request(url).get('/');
  let pass = true;

  if (!this.equals(response.statusCode, expected.statusCode)) pass = false;
  if (!response.text.match(expected.text)) pass = false;

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