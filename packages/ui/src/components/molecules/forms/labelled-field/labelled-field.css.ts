import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    width: 'fit-content',
  },
  variants: {
    isLabelHidden: {
      false: {
        gap: contract.spacing.xxs,
      },
      true: {},
    },
    isReversedOrder: {
      false: {},
      true: {},
    },
    layout: {
      column: {},
      row: {
        alignItems: 'center',
      },
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
