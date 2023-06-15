import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types';
import { validatePagesProp } from './validate-pages-prop';

describe('validate-pages-prop', () => {
  it('returns an empty array when the config is valid', () => {
    expect(validatePagesProp({ homepage: 'home' })).toStrictEqual([]);
  });

  it('returns an error when the config is not an object', () => {
    const config = true;
    const result = validatePagesProp(config);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'pages',
      reason: 'object expected',
      received: typeof config,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an error if one of the required object key is invalid', () => {
    const config = {
      homepage: 42,
    };
    const result = validatePagesProp(config);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'pages',
      reason: 'homepage must be a string',
      received: typeof config.homepage,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an error if one of the nullable object key is invalid', () => {
    const config = {
      legalNotice: 42,
    };
    const result = validatePagesProp(config);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'pages',
      reason: 'legalNotice must be a string or null',
      received: typeof config.legalNotice,
    };

    expect(result).toContainEqual(expectedError);
  });
});
