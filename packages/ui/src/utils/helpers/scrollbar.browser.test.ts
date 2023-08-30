import { describe, expect, it } from 'vitest';
import { getScrollbarWidth } from './scrollbar';

describe('get-scrollbar-width', () => {
  it('returns the scrollbar width based on the window size', () => {
    // JSdom always return 0 for measurements.
    const expectedSize = 0;
    expect(getScrollbarWidth()).toBe(expectedSize);
  });
});
