import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const colophon = recipe({
  base: {},
  variants: {
    alignment: {
      center: {
        justifyContent: 'center',
      },
      left: {
        justifyContent: 'flex-start',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
  },
});

export const item = style({
  ':first-child': {
    listStyle: 'none',
  },
});
