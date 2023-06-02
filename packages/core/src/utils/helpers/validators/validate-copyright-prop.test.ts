import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { validateCopyrightProp } from './validate-copyright-prop';

describe('validate-copyright-prop', () => {
  it('returns an empty array if copyright value is valid', () => {
    const copyright = 'enim explicabo ex';
    expect(validateCopyrightProp(copyright)).toStrictEqual([]);
  });

  it('returns an array of error messages if copyright value is invalid', () => {
    const copyright = 42;
    const result = validateCopyrightProp(copyright);
    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'copyright',
      reason: 'string or null expected',
      received: typeof copyright,
    };

    expect(result).toContainEqual(expectedError);
  });
});
