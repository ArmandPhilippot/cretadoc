import type { CretadocLocale } from '../../../types/config';
import { SUPPORTED_LOCALES } from '../../constants';

export const isSupportedLocale = (locale: string): locale is CretadocLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(locale);
