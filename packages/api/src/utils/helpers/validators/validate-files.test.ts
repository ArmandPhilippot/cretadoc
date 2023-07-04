import { describe, expect, it } from 'vitest';
import { generateBase64String } from '..';
import {
  validateFileContents,
  validateFileId,
  validateFilename,
} from './validate-files';

describe('validate-file-contents', () => {
  it('returns an empty array when contents are valid', () => {
    const result = validateFileContents('enim eius sed');
    expect(result.length).toBe(0);
  });
});

describe('validate-filename', () => {
  it('returns an empty array when the filename is valid', () => {
    const result = validateFilename('sed');
    expect(result).toStrictEqual([]);
  });

  it('returns an error when the filename has an invalid length', () => {
    const result = validateFilename('');
    expect(result.length).toBe(1);
  });

  it('returns an error when the filename contains invalid characters', () => {
    const result = validateFilename('<');
    expect(result).toStrictEqual(['Invalid characters']);
  });
});

describe('validate-file-id', () => {
  it('returns an empty array when the id is valid', () => {
    const id = generateBase64String('./a-relative-path');
    const result = validateFileId(id);
    expect(result).toStrictEqual([]);
  });

  it('returns an error when the id is invalid', () => {
    const result = validateFileId('any-string');
    expect(result).toStrictEqual(['Invalid id']);
  });
});
