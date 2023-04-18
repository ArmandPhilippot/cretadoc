import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const borderColor = createVar();
export const borderSize = createVar();

const borderStyle = `${borderSize} ${contract.border.style.regular} ${borderColor}`;
const borderInline = recipe({
  base: {
    borderInline: borderStyle,
  },
  variants: {
    isInline: {
      false: {},
      true: {
        selectors: {
          '&:not(:first-child)': {
            marginInlineStart: `calc(${borderSize} * -1)`,
          },
        },
      },
    },
  },
});

const borderBlock = recipe({
  base: {
    borderBlock: borderStyle,
  },
  variants: {
    isInline: {
      false: {
        selectors: {
          '&:not(:first-child)': {
            marginBlockStart: `calc(${borderSize} * -1)`,
          },
        },
      },
      true: {},
    },
  },
});

export const marker = createVar();

export const paddingBlock = createVar();
export const paddingInline = createVar();

export const item = recipe({
  base: {},
  variants: {
    border: {
      all: {},
      block: {},
      bottom: style({ borderBottom: borderStyle }),
      inline: {},
      left: style({ borderLeft: borderStyle }),
      right: style({ borderRight: borderStyle }),
      top: style({ borderTop: borderStyle }),
    },
    hasMarker: {
      false: {
        listStyleType: 'none',
      },
      true: {
        listStyleType: marker,
      },
    },
    isBordered: {
      false: {},
      true: {
        paddingBlock,
        paddingInline,
      },
    },
    isInline: {
      false: {},
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { hasMarker: true, isBordered: true },
      style: {
        listStylePosition: 'inside',
      },
    },
    {
      variants: {
        isBordered: false,
        isInline: false,
      },
      style: {
        selectors: {
          '&:not(:last-child)': {
            marginBlockEnd: contract.spacing.xxs,
          },
        },
      },
    },
    {
      variants: { border: 'all', isInline: true },
      style: [
        borderInline({ isInline: true }),
        borderBlock({ isInline: true }),
      ],
    },
    {
      variants: { border: 'all', isInline: false },
      style: [
        borderInline({ isInline: false }),
        borderBlock({ isInline: false }),
      ],
    },
    {
      variants: { border: 'block', isInline: true },
      style: borderBlock({ isInline: true }),
    },
    {
      variants: { border: 'block', isInline: false },
      style: borderBlock({ isInline: false }),
    },
    {
      variants: { border: 'inline', isInline: true },
      style: borderInline({ isInline: true }),
    },
    {
      variants: { border: 'inline', isInline: false },
      style: borderInline({ isInline: false }),
    },
  ],
});

export type ListItemVariants = NonNullable<RecipeVariants<typeof item>>;
