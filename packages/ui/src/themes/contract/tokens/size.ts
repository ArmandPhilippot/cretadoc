import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { SizeTokens } from '../../../types';

export const size: ReplaceTypesIn<SizeTokens, string> = {
  full: 'size-full',
  prose: 'size-prose',
  sidebar: 'size-sidebar',
};
