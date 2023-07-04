import { describe, expect, it } from 'vitest';
import type { Meta } from '../../../types';
import { ALLOWED_STATUS } from '../../constants';
import { validateFileStatus, validateFrontMatterMeta } from './validate-meta';

describe('validate-file-status', () => {
  it('returns an empty array when the status is valid', () => {
    const result = validateFileStatus(ALLOWED_STATUS.DRAFT);
    expect(result).toStrictEqual([]);
  });

  it('returns an error when the status is invalid', () => {
    const result = validateFileStatus('not-allowed');
    expect(result.length).toBe(1);
    expect(result[0]).toMatch(/Invalid status/);
  });
});

describe('validate-front-matter-meta', () => {
  it('returns an empty array when meta are valid', () => {
    const meta: Meta = {
      title: 'doloribus dolorem asperiores',
    };
    const result = validateFrontMatterMeta(meta);
    expect(result.length).toBe(0);
  });

  it('returns an array of errors when meta are invalid', () => {
    const meta: Meta = {
      // @ts-expect-error - The status is invalid.
      status: 'unknown',
    };
    const result = validateFrontMatterMeta(meta);
    expect(result.length).toBeTruthy();
  });
});
