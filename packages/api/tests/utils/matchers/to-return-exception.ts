import { isObject, isObjKeyExist } from '@cretadoc/utils';
import type { APIErrorCode } from 'src';
import type supertest from 'supertest';
import type { MatcherResult } from '../types';

type APIException = {
  code: APIErrorCode;
  message: string;
};

export type ToReturnException = {
  toReturnException: (expected: APIException) => MatcherResult;
};

export function toReturnException(
  this: ReturnType<Vi.ExpectStatic['getState']>,
  body: supertest.Response['body'],
  expected: APIException
): MatcherResult {
  if (!isObject(body) || !isObjKeyExist(body, 'errors')) {
    const contain = this.isNot ? 'Does not contain' : 'Contains';

    return {
      pass: false,
      message: () => `${contain} errors.`,
      actual: body,
    };
  }

  const match = this.isNot ? 'does not match' : 'matches';
  const message = () => `Exception ${match}.`;

  const stringifiedErrors = this.utils.stringify(body.errors);
  const hasCode = stringifiedErrors.includes(`"code": "${expected.code}"`);
  const hasMessage = stringifiedErrors.includes(expected.message);

  return {
    pass: hasCode && hasMessage,
    message,
    actual: body.errors,
    expected,
  };
}
