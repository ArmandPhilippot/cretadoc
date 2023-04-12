import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const itemSpacing = createVar();

export const list = recipe({
  base: {
    margin: 0,
    padding: 0,
    selectors: {
      '& &': {
        paddingBlockStart: itemSpacing,
      },
    },
  },
  variants: {
    hasMarker: {
      false: {
        listStyleType: 'none',
      },
      true: {},
    },
    isInline: {
      false: {
        selectors: {
          '& &': {
            paddingBlockStart: contract.spacing.xxs,
            paddingInlineStart: contract.spacing.md,
          },
        },
      },
      true: {
        display: 'flex',
        flexFlow: 'row wrap',
        gap: itemSpacing,
        placeItems: 'baseline',
        listStylePosition: 'inside',
        selectors: {
          '& &': {
            paddingInlineStart: 0,
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: { hasMarker: true, isInline: false },
      style: {
        paddingInlineStart: contract.spacing.sm,
      },
    },
  ],
});

globalStyle(
  `${list({ isInline: true }).split(' ')[1] ?? ''} ${
    list({ isInline: false }).split(' ')[1] ?? ''
  }`,
  {
    paddingInlineStart: 0,
  }
);
