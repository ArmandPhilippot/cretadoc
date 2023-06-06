import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE } from '../../constants';
import { isSupportedLocale } from './is-supported-locale';

describe('is-supported-locale', () => {
  it('returns true if the given locale is supported', () => {
    expect(isSupportedLocale(DEFAULT_LOCALE)).toBe(true);
  });

  it('returns false if the given locale is not supported', () => {
    expect(isSupportedLocale('sed')).toBe(false);
  });
});
