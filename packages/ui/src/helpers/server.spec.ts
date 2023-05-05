// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { isBrowser } from './is';
import { getScrollbarWidth } from './scrollbar';

describe('is-browser', () => {
  it('returns false if the function is executed in server-side', () => {
    expect(isBrowser()).toBe(false);
  });
});

describe('get-scrollbar-width', () => {
  it('returns a default scrollbar width when used in server-side', () => {
    // Same default width declared in the function.
    const defaultWidth = 15;
    expect(getScrollbarWidth()).toBe(defaultWidth);
  });
});
