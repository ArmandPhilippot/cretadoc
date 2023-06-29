import { describe, expect, it } from 'vitest';
import { ALLOWED_STATUS } from '../../constants';
import { validateFileStatus } from './validate-meta';

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
