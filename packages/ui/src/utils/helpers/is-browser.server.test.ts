// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { isBrowser } from './is-browser';

describe('is-browser', () => {
  it('returns false if the function is executed in server-side', () => {
    expect(isBrowser()).toBe(false);
  });
});
