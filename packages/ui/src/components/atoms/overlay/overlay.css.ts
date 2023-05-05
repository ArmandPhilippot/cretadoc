import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const overlay = recipe({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    background: 'hsla(0, 0%, 0%, 0.6)',
    transitionDuration: contract.animation.duration.medium,
    transitionProperty: 'all',
    transitionTimingFunction: contract.animation.timing.linear,
  },
  variants: {
    isVisible: {
      false: {
        opacity: 0,
        overflow: 'hidden',
        visibility: 'hidden',
      },
      true: {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
});
