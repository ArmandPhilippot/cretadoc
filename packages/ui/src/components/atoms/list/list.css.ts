import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

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
      false: {},
      true: {},
    },
    isBordered: {
      false: {},
      true: {},
    },
    isInline: {
      false: {
        selectors: {
          '& &': {
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
      variants: { hasMarker: true, isBordered: false, isInline: false },
      style: {
        paddingInlineStart: contract.spacing.sm,
      },
    },
  ],
});

export const item = recipe({
  base: {
    selectors: {
      [`${list({ isInline: false }).split(' ')[1] ?? ''} &`]: {
        marginBottom: itemSpacing,
      },
    },
  },
});

globalStyle(
  `${list({ isInline: true }).split(' ')[1] ?? ''} ${
    list({ isInline: false }).split(' ')[1] ?? ''
  }`,
  {
    paddingInlineStart: 0,
  }
);
