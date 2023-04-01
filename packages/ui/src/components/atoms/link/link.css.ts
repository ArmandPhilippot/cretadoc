import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const link = recipe({
  base: {
    color: contract.color.primary.base,
    textDecorationThickness: 0,
    textDecorationColor: 'transparent',
    textUnderlineOffset: 3,
    transitionProperty: 'all',
    transitionDuration: contract.animation.duration.fast,
    transitionTimingFunction: contract.animation.timing.linear,
    transitionDelay: '0s',
    ':hover': {
      color: contract.color.primary.light,
      textDecorationColor: contract.color.primary.light,
      textDecorationThickness: 1,
    },
    ':focus': {
      color: contract.color.primary.light,
      textDecorationColor: contract.color.primary.light,
      textDecorationThickness: 2,
    },
    ':active': {
      color: contract.color.primary.dark,
      textDecorationColor: contract.color.primary.dark,
    },
  },
  variants: {
    hasLang: {
      false: {},
      true: {
        '::after': {
          display: 'inline-block',
          content: "'\\0000a0[' attr(hreflang) ']'",
          fontSize: contract.font.size.sm,
        },
      },
    },
  },
});
