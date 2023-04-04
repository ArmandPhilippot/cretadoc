import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

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

export const term = style({
  color: termColor,
  fontWeight: contract.font.weight.strong,
  selectors: {
    [`${list({ isInline: false }).split(' ')[1] ?? ''} ${description} + &`]: {
      marginBlockStart: listSpacing,
    },
    [`${list({ isInline: true }).split(' ')[1] ?? ''} ${description} + &`]: {
      marginInlineStart: listSpacing,
    },
  },
});
