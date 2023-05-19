import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const listSpacing = createVar();

export const list = recipe({
  base: {
    display: 'flex',
    margin: 0,
  },
  variants: {
    isInline: {
      false: {
        flexFlow: 'column',
      },
      true: {
        flexFlow: 'row wrap',
        gap: listSpacing,
      },
    },
  },
});

const inlinedList = list({ isInline: true }).split(' ')[1] ?? '';
const stackedList = list({ isInline: false }).split(' ')[1] ?? '';

export const groupSpacing = createVar();

export const group = recipe({
  base: {
    display: 'flex',
    gap: groupSpacing,
    selectors: {
      [`${list({ isInline: false }).split(' ')[1] ?? ''} &:not(:first-child)`]:
        {
          marginBlockStart: listSpacing,
        },
      [`${list({ isInline: true }).split(' ')[1] ?? ''} &:not(:first-child)`]: {
        marginInlineStart: listSpacing,
      },
    },
  },
  variants: {
    isInline: {
      false: {
        flexFlow: 'column',
      },
      true: {
        flexFlow: 'row wrap',
      },
    },
  },
});

export const descriptionColor = createVar();

export const description = style({
  margin: 0,
  color: descriptionColor,
});

export const termColor = createVar();

export const term = recipe({
  base: {
    color: termColor,
    selectors: {
      [`${inlinedList} ${description} + &`]: {
        marginInlineStart: listSpacing,
      },
      [`${stackedList} ${description} + &`]: {
        marginBlockStart: listSpacing,
      },
    },
  },
  variants: {
    isBold: {
      false: {},
      true: {
        fontWeight: contract.font.weight.strong,
      },
    },
  },
});
