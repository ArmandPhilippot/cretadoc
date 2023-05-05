import { describe, expect, it } from 'vitest';
import { isBrowser } from './is';
import { getScrollbarWidth } from './scrollbar';

describe('is-browser', () => {
  it('returns true if the function is executed in browser-side', () => {
    expect(isBrowser()).toBe(true);
  });
});

describe('get-scrollbar-width', () => {
  it('returns the scrollbar width based on the window size', () => {
    // JSdom always return 0 for measurements.
    const expectedSize = 0;
    expect(getScrollbarWidth()).toBe(expectedSize);
  });
});
