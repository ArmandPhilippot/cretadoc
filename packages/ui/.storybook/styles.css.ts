import { recipe } from '@vanilla-extract/recipes';
import { buildThemes, contract, themes } from '../src';

buildThemes(themes);

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
        maxWidth: `calc(100% - 2 * ${contract.spacing.sm})`,
        padding: contract.spacing.sm,
      },
      on: {
        padding: 0,
        minHeight: '100%',
      },
    },
  },
});
