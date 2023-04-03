import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const borderColor = createVar();
export const borderSize = createVar();

const borderStyle = `${borderSize} ${contract.border.style.regular} ${borderColor}`;
const borderInline = style({ borderInline: borderStyle });
const borderBlock = style({
  borderBlock: borderStyle,
  selectors: {
    '&:not(:first-child)': {
      marginTop: `calc(${borderSize} * -1)`,
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
      all: [borderInline, borderBlock],
      block: borderBlock,
      bottom: style({ borderBottom: borderStyle }),
      inline: borderInline,
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
      false: {
        marginBlockEnd: contract.spacing.xxs,
      },
      true: {
        paddingBlock,
        paddingInline,
      },
    },
  },
  compoundVariants: [
    {
      variants: { hasMarker: true, isBordered: true },
      style: {
        listStylePosition: 'inside',
      },
    },
  ],
});

export type ListItemVariants = NonNullable<RecipeVariants<typeof item>>;
