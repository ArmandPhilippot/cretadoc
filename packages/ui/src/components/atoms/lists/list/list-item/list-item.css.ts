import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { contract } from '../../../../../themes';
import { list } from '../list.css';

const inlinedList = list({ isInline: true }).split(' ')[1] ?? 'should-exit';
const stackedList = list({ isInline: false }).split(' ')[1] ?? 'should-exit';

export const borderColor = createVar();
export const borderSize = createVar();
export const marker = createVar();
export const paddingBlock = createVar();
export const paddingInline = createVar();

const borderStyle = `${borderSize} ${contract.border.style.regular} ${borderColor}`;

const borderInline = style({
  borderInline: borderStyle,
  selectors: {
    [`${inlinedList} &:not(:first-child)`]: {
      marginInlineStart: `calc(${borderSize} * -1)`,
    },
  },
});

const borderBlock = style({
  borderBlock: borderStyle,
  selectors: {
    [`${stackedList} &:not(:first-child)`]: {
      marginBlockStart: `calc(${borderSize} * -1)`,
    },
  },
});

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
        selectors: {
          [`${stackedList} &:not(:last-child)`]: {
            marginBlockEnd: contract.spacing.xxs,
          },
        },
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
