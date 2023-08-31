import { describe, expect, it } from 'vitest';
import { darkThemes, lightThemes, themes } from './library';
import {
  isValidDarkThemeId,
  isValidLightThemeId,
  isValidThemeId,
} from './themes';

describe('is-valid-theme-id', () => {
  it('returns true if the theme id is valid', () => {
    const themeId = themes[0]?.id ?? 'should-exist';

    expect(isValidThemeId(themeId)).toBe(true);
  });

  it('returns false if the theme id is invalid', () => {
    const themeId = 'inexistent-theme';

    expect(isValidThemeId(themeId)).toBe(false);
  });
});

describe('is-valid-dark-theme-id', () => {
  it('returns true if the theme id is valid', () => {
    const themeId = darkThemes[0]?.id ?? 'should-exist';

    expect(isValidDarkThemeId(themeId)).toBe(true);
  });

  it('returns false if the theme id is invalid', () => {
    const themeId = 'inexistent-theme';

    expect(isValidDarkThemeId(themeId)).toBe(false);
  });
});

describe('is-valid-light-theme-id', () => {
  it('returns true if the theme id is valid', () => {
    const themeId = lightThemes[0]?.id ?? 'should-exist';

    expect(isValidLightThemeId(themeId)).toBe(true);
  });

  it('returns false if the theme id is invalid', () => {
    const themeId = 'inexistent-theme';

    expect(isValidLightThemeId(themeId)).toBe(false);
  });
});
