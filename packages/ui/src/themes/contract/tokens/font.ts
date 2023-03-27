import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { FontTokens } from '../../types/tokens';

export const font: ReplaceTypesIn<FontTokens, string> = {
  family: {
    regular: 'font-family-regular',
    monospace: 'font-family-monospace',
  },
  letterSpacing: {
    narrow: 'letter-spacing-narrow',
    regular: 'letter-spacing-regular',
    spaced: 'letter-spacing-spaced',
  },
  lineHeight: {
    sm: 'line-height-sm',
    md: 'line-height-md',
    lg: 'line-height-lg',
  },
  size: {
    xs: 'font-size-xs',
    sm: 'font-size-sm',
    md: 'font-size-md',
    lg: 'font-size-lg',
    xl: 'font-size-xl',
    xxl: 'font-size-xxl',
  },
  weight: {
    light: 'font-weight-light',
    regular: 'font-weight-regular',
    strong: 'font-weight-strong',
  },
};
