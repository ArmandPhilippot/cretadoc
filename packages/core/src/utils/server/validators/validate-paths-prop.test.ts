import { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';
import type { CretadocPaths } from '../../../types/config';
import type { ValidationError } from '../../../types/internals';
import { validatePathsProp } from './validate-paths-prop';

describe('validate-paths-prop', () => {
  it('returns an empty array if the paths properties are valid', () => {
    const paths: CretadocPaths = {
      doc: null,
      pages: dirname(fileURLToPath(new URL(import.meta.url))),
    };
    expect(validatePathsProp(paths)).toStrictEqual([]);
  });

  it('returns an array of errors if the value is not an object ', () => {
    const paths = 42;
    const result = validatePathsProp(paths);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'paths',
      reason: 'object expected',
      received: typeof paths,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of errors if the pages prop is missing', () => {
    const paths = {
      doc: null,
      foo: 'bar',
    };
    const result = validatePathsProp(paths);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'paths',
      reason: 'unknown key',
      received: 'foo',
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of errors if the pages prop type is invalid', () => {
    const paths = {
      doc: null,
      pages: 42,
    };
    const result = validatePathsProp(paths);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'paths',
      reason: 'string or null expected in pages property',
      received: typeof paths.pages,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of errors if the pages prop is not a directory', () => {
    const paths: CretadocPaths = {
      doc: null,
      pages: 'a-path',
    };
    const result = validatePathsProp(paths);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'paths',
      reason: 'existing directory expected in pages property',
      received: paths.pages ?? '',
    };

    expect(result).toContainEqual(expectedError);
  });
});
