import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    gap: contract.spacing.xxs,
    width: 'fit-content',
  },
  variants: {
    layout: {
      column: {},
      row: {
        alignItems: 'center',
      },
    },
    isReversedOrder: {
      false: {},
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { isReversedOrder: false, layout: 'column' },
      style: {
        flexFlow: 'column',
      },
    },
    {
      variants: { isReversedOrder: false, layout: 'row' },
      style: {
        flexFlow: 'row',
      },
    },
    {
      variants: { isReversedOrder: true, layout: 'column' },
      style: {
        flexFlow: 'column-reverse',
      },
    },
    {
      variants: { isReversedOrder: true, layout: 'row' },
      style: {
        flexFlow: 'row-reverse',
      },
    },
  ],
});
