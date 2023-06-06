import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { DEFAULT_CONFIG } from '../../constants';
import { validateThemeProp } from './validate-theme-prop';

describe('validate-theme-prop', () => {
  it('returns an empty array if theme value is valid', () => {
    expect(validateThemeProp(DEFAULT_CONFIG.theme)).toStrictEqual([]);
  });

  it('returns an array of error messages if the theme type is invalid', () => {
    const theme = 42;
    const result = validateThemeProp(theme);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'theme',
      reason: 'string or object expected',
      received: typeof theme,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the theme is invalid', () => {
    const theme = 'nihil';
    const result = validateThemeProp(theme);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'theme',
      reason: 'invalid theme',
      received: theme,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the theme is an invalid object', () => {
    const theme = { foo: '', bar: 42 };
    const result = validateThemeProp(theme);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'theme',
      reason: 'dark and light properties expected',
      received: Object.keys(theme).join(', '),
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if a scheme value is invalid', () => {
    const theme = { dark: 42, light: DEFAULT_CONFIG.theme };
    const result = validateThemeProp(theme);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'theme',
      reason: 'dark property: string expected',
      received: typeof theme.dark,
    };

    expect(result).toContainEqual(expectedError);
  });
});
