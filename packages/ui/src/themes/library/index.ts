import type { DarkTheme, LightTheme, Theme } from '../types';
import { cretadocDark, cretadocLight } from './cretadoc';

export const darkThemes = [cretadocDark] satisfies readonly DarkTheme[];

export const lightThemes = [cretadocLight] satisfies readonly LightTheme[];

export const themes = [
  ...darkThemes,
  ...lightThemes,
] satisfies readonly Theme[];

export const darkThemesIds: ReadonlyArray<(typeof darkThemes)[number]['id']> =
  Object.values(darkThemes).map((theme) => theme.id);

export const lightThemesIds: ReadonlyArray<(typeof lightThemes)[number]['id']> =
  Object.values(lightThemes).map((theme) => theme.id);

export const themesIds: ReadonlyArray<(typeof themes)[number]['id']> =
  Object.values(themes).map((theme) => theme.id);

/**
 * An union of ids from the available dark themes.
 */
export type CretadocDarkTheme = (typeof darkThemesIds)[number];

/**
 * An union of ids from the available light themes.
 */
export type CretadocLightTheme = (typeof lightThemesIds)[number];

/**
 * An union of ids from the available themes.
 */
export type CretadocTheme = (typeof themesIds)[number];
