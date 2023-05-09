import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { BorderTokens } from '../../types/tokens';

export const border: ReplaceTypesIn<BorderTokens, string> = {
  radius: {
    sharp: 'border-radius-sharp',
    soft: 'border-radius-soft',
    softer: 'border-radius-softer',
    pill: 'border-radius-pill',
    circle: 'border-radius-circle',
  },
  size: {
    sm: 'border-size-sm',
    md: 'border-size-md',
    lg: 'border-size-lg',
  },
  style: {
    regular: 'border-style-regular',
  },
};
