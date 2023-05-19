import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const metaSize = createVar();

export const meta = recipe({
  base: {
    fontSize: metaSize,
  },
  variants: {
    isInline: {
      false: {},
      true: {},
    },
  },
});

const stackedMeta = meta({ isInline: false }).split(' ')[1] ?? '';

export const group = style({
  placeItems: 'center',
});

export const label = style({
  selectors: {
    [`${stackedMeta} &::after`]: {
      content: '\\00a0',
    },
  },
});
