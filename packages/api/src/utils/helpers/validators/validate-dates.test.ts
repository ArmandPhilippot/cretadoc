import { describe, expect, it } from 'vitest';
import { validateDateTime } from './validate-dates';

describe('validate-date-time', () => {
  it('returns an error when the format is invalid', () => {
    const result = validateDateTime('');
    expect(result.length).toBe(1);
    expect(result[0]).toMatch(/Invalid date/);
  });

  it('returns an error when the time format is invalid', () => {
    const result = validateDateTime('2023-01-01 12');
    expect(result.length).toBe(1);
    expect(result[0]).toMatch(/Invalid time/);
  });
});
