import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { DEFAULT_CONFIG } from '../../constants';
import { validateNameProp } from './validate-name-prop';

describe('validate-name-prop', () => {
  it('returns an empty array if name value is valid', () => {
    expect(validateNameProp(DEFAULT_CONFIG.name)).toStrictEqual([]);
  });

  it('returns an array of error messages if name value is invalid', () => {
    const name = 42;
    const result = validateNameProp(name);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'name',
      reason: 'string expected',
      received: typeof name,
    };

    expect(result).toContainEqual(expectedError);
  });
});
