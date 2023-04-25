import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const pagination = recipe({
  variants: {
    isBordered: {
      false: {},
      true: {},
    },
  },
});

const borderedPagination =
  pagination({ isBordered: true }).split(' ')[1] ?? 'should-be-defined';

export const ellipsis = style({
  selectors: {
    [`${borderedPagination} &`]: {
      marginInline: contract.spacing.sm,
    },
  },
});
