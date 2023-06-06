import type { CretadocDarkTheme, CretadocLightTheme } from '@cretadoc/ui';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONFIG } from '../../constants';
import { isSupportedTheme } from './is-supported-theme';

describe('is-supported-theme', () => {
  it('returns true if the given theme id exists', () => {
    expect(isSupportedTheme(DEFAULT_CONFIG.theme)).toBe(true);
  });

  it('returns false if the given id is not a theme', () => {
    expect(isSupportedTheme('vero')).toBe(false);
  });

  it('returns true if the given theme id is a light theme', () => {
    const lightTheme: CretadocLightTheme = 'cretadoc-light';
    expect(isSupportedTheme(lightTheme, 'light')).toBe(true);
  });

  it('returns false if the given theme id is not a light theme', () => {
    const darkTheme: CretadocDarkTheme = 'cretadoc-dark';
    expect(isSupportedTheme(darkTheme, 'light')).toBe(false);
  });

  it('returns true if the given theme id is a dark theme', () => {
    const darkTheme: CretadocDarkTheme = 'cretadoc-dark';
    expect(isSupportedTheme(darkTheme, 'dark')).toBe(true);
  });

  it('returns false if the given theme id is not a dark theme', () => {
    const lightTheme: CretadocLightTheme = 'cretadoc-light';
    expect(isSupportedTheme(lightTheme, 'dark')).toBe(false);
  });
});
