import type { ReplaceTypesIn } from '@cretadoc/utils';
import type { AnimationTokens } from '../../../types';

export const animation: ReplaceTypesIn<AnimationTokens, string> = {
  duration: {
    fast: 'animation-duration-fast',
    medium: 'animation-duration-medium',
    slow: 'animation-duration-slow',
    slower: 'animation-duration-slower',
  },
  timing: {
    easeIn: 'animation-timing-ease-in',
    easeInOut: 'animation-timing-ease-in-out',
    easeOut: 'animation-timing-ease-out',
    linear: 'animation-timing-linear',
  },
};
