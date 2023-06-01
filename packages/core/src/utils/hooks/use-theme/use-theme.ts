import {
  type CretadocTheme,
  useMatchMedia,
  isValidThemeId,
} from '@cretadoc/ui';
import { isString } from '@cretadoc/utils';
import { useCallback } from 'react';
import type { CretadocThemes } from '../../../types/config';
import { LOCAL_STORAGE_KEY } from '../../constants';
import useLocalStorage from '../use-local-storage/use-local-storage';

export type UseThemeReturn = readonly [CretadocTheme, () => void];

/**
 * Custom React hook to handle theme change.
 *
 * @param {CretadocThemes} options - The themes options.
 * @returns {UseThemeReturn} A tuple with the theme and a toggle function.
 */
export const useTheme = (options: CretadocThemes): UseThemeReturn => {
  const isValidTheme = useCallback(
    <T = CretadocTheme>(theme: unknown): theme is T => {
      if (!isString(theme)) return false;
      if (!isValidThemeId(theme)) return false;
      if (theme !== options.dark && theme !== options.light) return false;
      return true;
    },
    [options]
  );

  const isDarkSchemePreferred = useMatchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useLocalStorage(
    LOCAL_STORAGE_KEY.THEME,
    isDarkSchemePreferred ? options.dark : options.light,
    isValidTheme
  );

  const toggle = useCallback(() => {
    setTheme((prevTheme) => {
      if (prevTheme === options.dark) return options.light;
      return options.dark;
    });
  }, [options, setTheme]);

  return [theme, toggle] as const;
};
