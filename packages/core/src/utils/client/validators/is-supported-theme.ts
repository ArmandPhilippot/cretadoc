import {
  type ThemeScheme,
  isValidDarkThemeId,
  isValidLightThemeId,
  isValidThemeId,
} from '@cretadoc/ui';

/**
 * Check if the given theme id matches an existing theme.
 *
 * @param {string} id - A theme id.
 * @param {ThemeScheme} [scheme] - A theme scheme.
 * @returns {boolean} True if it is a valid theme.
 */
export const isSupportedTheme = (id: string, scheme?: ThemeScheme): boolean => {
  if (scheme === 'light') return isValidLightThemeId(id);
  if (scheme === 'dark') return isValidDarkThemeId(id);
  return isValidThemeId(id);
};
