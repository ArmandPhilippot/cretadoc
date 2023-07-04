import { isObjKeyExist } from '@cretadoc/utils';
import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import { API_ERROR_CODE } from '../constants';
import { UserInputError } from './user-input-error';

describe('UserInputError', () => {
  it('can create a GraphQLError instance', () => {
    const message = 'aut fugit sed';
    const exception = new UserInputError(message);

    expect(exception instanceof GraphQLError).toBe(true);
    expect(exception.message).toBe(message);
    expect(isObjKeyExist(exception.extensions, 'cretadoc')).toBe(true);
    expect(exception.extensions['cretadoc']).toContain({
      code: API_ERROR_CODE.BAD_USER_INPUT,
    });
  });
});
