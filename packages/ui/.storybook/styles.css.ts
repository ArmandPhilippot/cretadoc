import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../src';

export const container = recipe({
  base: {
    width: '100%',
    background: contract.color.background.regular.base,
    color: contract.color.foreground.regular.base,
    fontFamily: contract.font.family.regular,
  },
  variants: {
    fullscreen: {
      off: {
        padding: contract.spacing.sm,
      },
      on: {
        padding: 0,
        minHeight: '100%',
      },
    },
  },
});
