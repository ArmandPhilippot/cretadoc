import { describe, expect, it } from 'vitest';
import { hasValidationErrors, initValidationErrors } from './validation';

describe('init-validation-errors', () => {
  it('can create a new object with an array as value for each key', () => {
    const initialObject = {
      foo: 'bar',
      bar: 'baz',
    };
    const validationErrors = initValidationErrors(initialObject);

    expect(Object.keys(validationErrors)).toStrictEqual(
      Object.keys(initialObject)
    );
    expect(
      Object.values(validationErrors).every((value) => Array.isArray(value))
    ).toBe(true);
  });
});

describe('has-validation-errors', () => {
  it('returns true if some keys contains error messages', () => {
    const errors = {
      foo: [],
      bar: ['omnis in quod'],
    };
    expect(hasValidationErrors(errors)).toBe(true);
  });

  it('returns false if every keys contains an empty array', () => {
    const errors = {
      foo: [],
      bar: [],
    };
    expect(hasValidationErrors(errors)).toBe(false);
  });
});
