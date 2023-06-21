import { describe, expect, it } from 'vitest';
import type { APIConfig, ErrorDetails } from '../../types';
import { API_ERROR_CODE } from '../constants';
import {
  CretadocAPIError,
  getErrorItem,
  getErrorMessage,
  getErrorsList,
} from './cretadoc-api-error';

describe('get-error-message', () => {
  it('can return a formatted message', () => {
    const error: Omit<ErrorDetails, 'errorKind'> = {
      reason: 'too many args',
      received: 'foo, bar, baz',
    };
    const message = getErrorMessage(error);

    expect(message).toBe(`${error.reason}. Received: ${error.received}`);
  });

  it('can return a formatted message prefixed by a key', () => {
    const key: keyof APIConfig = 'data';
    const error: Omit<ErrorDetails<APIConfig>, 'errorKind'> = {
      key,
      reason: 'too many args',
      received: 'foo, bar, baz',
    };
    const message = getErrorMessage(error);

    expect(message).toBe(
      `${key}: ${error.reason}. Received: ${error.received}`
    );
  });
});

describe('get-error-item', () => {
  it('can return a RangeError', () => {
    const error: ErrorDetails = {
      errorKind: 'range',
      reason: '',
      received: '',
    };
    const item = getErrorItem(error);
    expect(item instanceof RangeError).toBe(true);
  });

  it('can return a ReferenceError', () => {
    const error: ErrorDetails = {
      errorKind: 'reference',
      reason: '',
      received: '',
    };
    const item = getErrorItem(error);
    expect(item instanceof ReferenceError).toBe(true);
  });

  it('can return a SyntaxError', () => {
    const error: ErrorDetails = {
      errorKind: 'syntax',
      reason: '',
      received: '',
    };
    const item = getErrorItem(error);
    expect(item instanceof SyntaxError).toBe(true);
  });

  it('can return a TypeError', () => {
    const error: ErrorDetails = {
      errorKind: 'type',
      reason: '',
      received: '',
    };
    const item = getErrorItem(error);
    expect(item instanceof TypeError).toBe(true);
  });
});

describe('get-errors-list', () => {
  it('can return a list of error items', () => {
    const errors: ErrorDetails[] = [
      { errorKind: 'range', reason: '', received: '' },
      { errorKind: 'syntax', reason: '', received: '' },
    ];
    const list = getErrorsList(errors);

    expect(list.length).toBe(errors.length);
  });
});

describe('cretadoc-api-error', () => {
  it('returns an AggregatorError instance from a single error', () => {
    const message = '';
    const details: ErrorDetails = {
      errorKind: 'type',
      reason: 'String expected',
      received: typeof true,
    };
    const exception = new CretadocAPIError(message, details);

    expect(exception instanceof AggregateError).toBe(true);
    expect(exception.message).toBe(message);
    expect(exception.cause).toContain({
      code: API_ERROR_CODE.INTERNAL_ERROR,
    });
    expect(exception.errors).toStrictEqual([getErrorItem(details)]);
  });

  it('returns an AggregatorError instance from multiple errors', () => {
    const message = '';
    const details: ErrorDetails[] = [
      {
        errorKind: 'type',
        reason: 'String expected',
        received: typeof true,
      },
      {
        errorKind: 'syntax',
        reason: 'Absolute path expected',
        received: './relative/path',
      },
    ];
    const exception = new CretadocAPIError(message, details);

    expect(exception instanceof AggregateError).toBe(true);
    expect(exception.message).toBe(message);
    expect(exception.cause).toContain({
      code: API_ERROR_CODE.INTERNAL_ERROR,
    });
    expect(exception.errors).toStrictEqual(getErrorsList(details));
  });
});
