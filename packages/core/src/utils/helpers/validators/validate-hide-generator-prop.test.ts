import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { validateHideGeneratorProp } from './validate-hide-generator-prop';

describe('validate-hide-generator-prop', () => {
  it('returns an empty array if hideGenerator value is valid', () => {
    const hideGenerator = true;
    expect(validateHideGeneratorProp(hideGenerator)).toStrictEqual([]);
  });

  it('returns an array of error messages if hideGenerator value is invalid', () => {
    const hideGenerator = 42;
    const result = validateHideGeneratorProp(hideGenerator);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'hideGenerator',
      reason: 'boolean expected',
      received: typeof hideGenerator,
    };

    expect(result).toContainEqual(expectedError);
  });
});
