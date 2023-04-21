import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';
import { animationSpeed } from '../icon.css';

export const angle = recipe({
  base: {
    transformOrigin: 'center',
    transitionProperty: 'transform',
    transitionDuration: animationSpeed,
    transitionTimingFunction: contract.animation.timing.linear,
  },
  variants: {
    orientation: {
      bottom: {
        transform: 'rotate(0.25turn)',
      },
      left: {
        transform: 'rotate(0.5turn)',
      },
      right: {
        transform: 'rotate(0)',
      },
      top: {
        transform: 'rotate(0.75turn)',
      },
    },
  },
});
