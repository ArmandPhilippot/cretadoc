import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { SpacingTokens } from '../../types/tokens';

export const spacing: ReplaceTypesIn<SpacingTokens, string> = {
  xxs: 'spacing-xxs',
  xs: 'spacing-xs',
  sm: 'spacing-sm',
  md: 'spacing-md',
  lg: 'spacing-lg',
  xl: 'spacing-xl',
  xxl: 'spacing-xxl',
};
