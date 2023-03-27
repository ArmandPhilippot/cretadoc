import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    placeItems: 'center',
  },
  variants: {
    orientation: {
      inline: {
        flexFlow: 'row wrap',
      },
      stack: {
        flexFlow: 'column wrap',
      },
    },
  },
});

export const preview = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeItems: 'center',
  justifyContent: 'center',
  minWidth: 250,
  minHeight: 100,
});

export const token = style({
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
  marginBlock: 10,
});
