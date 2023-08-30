import { describe, expect, it } from 'vitest';
import { isBrowser } from './is-browser';

describe('is-browser', () => {
  it('returns true if the function is executed in browser-side', () => {
    expect(isBrowser()).toBe(true);
  });
});
