import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { CretadocThemes } from '../../../types/config';
import { useTheme } from './use-theme';

describe('use-theme', () => {
  it('returns the light theme by default and switch the theme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        return {
          matches: query === '(prefers-color-scheme: light)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    });
    const options: CretadocThemes = {
      dark: 'cretadoc-dark',
      light: 'cretadoc-light',
    };
    const { result } = renderHook(() => useTheme(options));

    expect(result.current[0]).toBe(options.light);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(options.dark);
  });

  it('returns the dark theme by default if user prefers dark scheme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => {
        return {
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }),
    });
    const options: CretadocThemes = {
      dark: 'cretadoc-dark',
      light: 'cretadoc-light',
    };
    const { result } = renderHook(() => useTheme(options));

    expect(result.current[0]).toBe(options.dark);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(options.light);
  });
});
