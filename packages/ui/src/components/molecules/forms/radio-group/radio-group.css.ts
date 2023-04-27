import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const group = recipe({
  base: {
    display: 'flex',
    padding: 0,
    border: 'none',
  },
  variants: {
    isInline: {
      false: {
        flexFlow: 'column wrap',
        gap: contract.spacing.xs,
      },
      true: {
        flexFlow: 'row wrap',
        gap: contract.spacing.md,
      },
    },
  },
});

export const legend = style({
  marginBlockEnd: contract.spacing.xs,
});
