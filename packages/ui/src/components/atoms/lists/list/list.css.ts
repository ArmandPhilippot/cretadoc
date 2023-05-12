import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const itemSpacing = createVar();
export const inlinePadding = createVar();

export const list = recipe({
  base: {
    margin: 0,
    padding: 0,
    selectors: {
      '& &': {
        paddingBlockStart: itemSpacing,
      },
    },
    vars: {
      [inlinePadding]: contract.spacing.sm,
    },
  },
  variants: {
    hasMarker: {
      false: {
        listStyleType: 'none',
      },
      true: {},
    },
    isHierarchical: {
      false: {},
      true: {
        counterReset: 'item',
      },
    },
    isInline: {
      false: {},
      true: {
        display: 'flex',
        flexFlow: 'row wrap',
        gap: itemSpacing,
      },
    },
  },
  compoundVariants: [
    {
      variants: { hasMarker: true, isHierarchical: false, isInline: false },
      style: {
        paddingInlineStart: inlinePadding,
        selectors: {
          '& &': {
            paddingInlineStart: `calc(${inlinePadding} * 1.25)`,
          },
        },
      },
    },
    {
      variants: { hasMarker: true, isInline: true },
      style: {
        listStylePosition: 'inside',
      },
    },
  ],
});
