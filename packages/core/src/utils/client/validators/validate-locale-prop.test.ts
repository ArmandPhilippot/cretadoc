import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { DEFAULT_LOCALE } from '../../constants';
import { validateLocaleProp } from './validate-locale-prop';

describe('validate-locale-prop', () => {
  it('returns an empty array if locale value is valid', () => {
    expect(validateLocaleProp(DEFAULT_LOCALE)).toStrictEqual([]);
  });

  it('returns an array of error messages if the locale type is invalid', () => {
    const locale = 42;
    const result = validateLocaleProp(locale);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'locale',
      reason: 'string expected',
      received: typeof locale,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the locale is invalid', () => {
    const locale = 'ducimus';
    const result = validateLocaleProp(locale);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'locale',
      reason: 'not supported',
      received: locale,
    };

    expect(result).toContainEqual(expectedError);
  });
});
