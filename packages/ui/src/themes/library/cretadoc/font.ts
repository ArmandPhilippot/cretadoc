import type { FontTokens } from '../../../types';

export const font: FontTokens = {
  family: {
    regular: 'Liberation Sans, arial, sans-serif',
    monospace: 'Liberation Mono, DejaVu Sans Mono, Courier New, monospace',
  },
  letterSpacing: {
    narrow: '-1px',
    regular: '0',
    spaced: '1px',
  },
  lineHeight: {
    sm: '1',
    md: '1.5',
    lg: '1.8',
  },
  size: {
    xs: '0.8rem',
    sm: '0.833rem',
    md: '1rem',
    lg: '1.2rem',
    xl: '1.44rem',
    xxl: '1.728rem',
  },
  weight: {
    light: '300',
    regular: '400',
    strong: '600',
  },
};
