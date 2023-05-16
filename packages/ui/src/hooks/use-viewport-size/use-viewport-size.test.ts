import { act, fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useViewportSize } from './use-viewport-size';

describe('use-viewport-size', () => {
  it('returns the height and the width of the viewport', () => {
    const initialWindowWidth = 1024;
    const initialWindowHeight = 768;
    const { result } = renderHook(() => useViewportSize());

    expect(result.current.width).toBe(initialWindowWidth);
    expect(result.current.height).toBe(initialWindowHeight);

    const newWindowWidth = 800;
    const newWindowHeight = 600;

    act(() => {
      window.innerWidth = newWindowWidth;
      window.innerHeight = newWindowHeight;

      fireEvent(window, new Event('resize'));
    });

    expect(result.current.height).toBe(newWindowHeight);
    expect(result.current.width).toBe(newWindowWidth);
  });
});
