import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../src';

export const container = recipe({
  base: {
    background: contract.color.background.regular.base,
    color: contract.color.foreground.regular.base,
    fontFamily: contract.font.family.regular,
  },
  variants: {
    fullscreen: {
      off: {
        padding: '1rem',
        width: 'calc(100% - 1rem * 2)',
      },
      on: {
        padding: 0,
        width: '100%',
      },
    },
  },
});
