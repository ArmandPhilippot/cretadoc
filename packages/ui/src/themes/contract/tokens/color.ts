import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { ColorTokens } from '../../types/tokens';

export const color: ReplaceTypesIn<ColorTokens, string> = {
  background: {
    critical: 'color-background-critical',
    info: 'color-background-info',
    inverted: {
      base: 'color-background-inverted',
      dark: 'color-background-inverted-dark',
      light: 'color-background-inverted-light',
    },
    muted: 'color-background-muted',
    regular: {
      base: 'color-background-regular',
      dark: 'color-background-regular-dark',
      light: 'color-background-regular-light',
    },
    success: 'color-background-success',
    warning: 'color-background-warning',
  },
  borders: {
    critical: 'color-border-critical',
    info: 'color-border-info',
    inverted: {
      base: 'color-border-inverted',
      dark: 'color-border-inverted-dark',
      light: 'color-border-inverted-light',
    },
    muted: 'color-border-muted',
    regular: {
      base: 'color-border-regular',
      dark: 'color-border-regular-dark',
      light: 'color-border-regular-light',
    },
    success: 'color-border-success',
    warning: 'color-border-warning',
  },
  foreground: {
    critical: 'color-foreground-critical',
    info: 'color-foreground-info',
    inverted: {
      base: 'color-foreground-inverted',
      dark: 'color-foreground-inverted-dark',
      light: 'color-foreground-inverted-light',
    },
    muted: 'color-foreground-muted',
    onCritical: 'color-foreground-on-critical',
    onInfo: 'color-foreground-on-info',
    onInverted: {
      base: 'color-foreground-on-inverted',
      dark: 'color-foreground-on-inverted-dark',
      light: 'color-foreground-on-inverted-light',
    },
    onMuted: 'color-foreground-on-muted',
    onPrimary: {
      base: 'color-foreground-on-primary',
      dark: 'color-foreground-on-primary-dark',
      light: 'color-foreground-on-primary-light',
    },
    onSuccess: 'color-foreground-on-success',
    onWarning: 'color-foreground-on-warning',
    regular: {
      base: 'color-foreground-regular',
      dark: 'color-foreground-regular-dark',
      light: 'color-foreground-regular-light',
    },
    success: 'color-foreground-success',
    warning: 'color-foreground-warning',
  },
  primary: {
    base: 'color-primary',
    dark: 'color-primary-dark',
    light: 'color-primary-light',
  },
};
