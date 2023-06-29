import { describe, expect, it } from 'vitest';
import { validateString } from './validate-strings';

describe('validate-string', () => {
  it('returns an empty array when receiving a valid string', () => {
    const result = validateString('provident');
    expect(result).toStrictEqual([]);
  });

  it('returns an error if the value is not a string', () => {
    const result = validateString(true);
    expect(result).toStrictEqual(['Must be a string']);
  });

  it('returns an error if the value does not match the min length', () => {
    const min = 50;
    const result = validateString('short', { lengthRange: { min } });
    expect(result).toStrictEqual([
      `Invalid length, should be between ${min} and unlimited characters`,
    ]);
  });

  it('returns an error if the value does not match the max length', () => {
    const max = 5;
    const result = validateString('too-long', { lengthRange: { max } });
    expect(result).toStrictEqual([
      `Invalid length, should be between 0 and ${max} characters`,
    ]);
  });
});
