import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { contract } from '../../../../../themes';
import { itemSpacing, list } from '../list.css';

const hierarchicalList =
  list({ isHierarchical: true }).split(' ')[1] ?? 'should-exist';
const inlinedList = list({ isInline: true }).split(' ')[1] ?? 'should-exist';
const stackedList = list({ isInline: false }).split(' ')[1] ?? 'should-exist';

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
  base: {
    selectors: {
      [`${hierarchicalList} &`]: {
        display: 'table',
      },
      [`${hierarchicalList} &::before`]: {
        content: 'counters(item, ".") ". "',
        counterIncrement: 'item',
        display: 'table-cell',
        paddingInlineEnd: contract.spacing.xxs,
      },
      [`${stackedList} &:not(:last-child)`]: {
        marginBlockEnd: itemSpacing,
      },
    },
  },
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
      false: {},
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
