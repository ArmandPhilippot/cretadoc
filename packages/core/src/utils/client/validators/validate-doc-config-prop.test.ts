import { describe, expect, it } from 'vitest';
import type { ValidationError } from '../../../types/internals';
import { DEFAULT_CONFIG } from '../../constants';
import { validateDocProp } from './validate-doc-prop';

describe('validate-doc-prop', () => {
  it('returns an empty array if doc value is valid', () => {
    expect(validateDocProp(DEFAULT_CONFIG.doc)).toStrictEqual([]);
  });

  it('returns an array of error messages if the doc type is invalid', () => {
    const doc = 42;
    const result = validateDocProp(doc);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'doc',
      reason: 'object expected',
      received: typeof doc,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the doc is an invalid object', () => {
    const doc = { foo: '', bar: 42 };
    const result = validateDocProp(doc);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'doc',
      reason: 'label and slug properties expected',
      received: Object.keys(doc).join(', '),
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the doc label is invalid', () => {
    const doc = { label: 42, slug: DEFAULT_CONFIG.doc.slug };
    const result = validateDocProp(doc);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'doc',
      reason: 'label property: string expected',
      received: typeof doc.label,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the doc slug is not a string', () => {
    const doc = { label: DEFAULT_CONFIG.doc.label, slug: 42 };
    const result = validateDocProp(doc);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'doc',
      reason: 'slug property: string starting with a slash (/) expected',
      received: typeof doc.slug,
    };

    expect(result).toContainEqual(expectedError);
  });

  it('returns an array of error messages if the doc slug is not a valid slug', () => {
    const doc = { label: DEFAULT_CONFIG.doc.label, slug: 'corrupti' };
    const result = validateDocProp(doc);

    expect(result).toHaveLength(1);

    const expectedError: ValidationError = {
      key: 'doc',
      reason: 'slug property: string starting with a slash (/) expected',
      received: typeof doc.slug,
    };

    expect(result).toContainEqual(expectedError);
  });
});
