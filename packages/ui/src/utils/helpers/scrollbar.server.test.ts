// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { getScrollbarWidth } from './scrollbar';

describe('get-scrollbar-width', () => {
  it('returns a default scrollbar width when used in server-side', () => {
    // Same default width declared in the function.
    const defaultWidth = 15;
    expect(getScrollbarWidth()).toBe(defaultWidth);
  });
});
