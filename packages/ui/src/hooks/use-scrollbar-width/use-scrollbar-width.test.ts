import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useScrollBarWidth } from './use-scrollbar-width';

describe('use-scrollbar-width', () => {
  it('returns the scrollbar width', () => {
    const { result } = renderHook(() => useScrollBarWidth());
    // JSdom always return 0 for measurements.
    const expectedSize = 0;
    expect(result.current).toBe(expectedSize);
  });
});
