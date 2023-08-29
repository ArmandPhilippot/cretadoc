import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../contract';

export const labelColor = createVar();
export const minHeight = createVar();

export const wrapper = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    orientation: {
      inline: {
        flexFlow: 'row wrap',
        alignItems: 'center',
        gap: '1rem',
      },
      stack: {
        flexFlow: 'column wrap',
        gap: '0.3rem',
      },
    },
  },
});

export const label = style({
  color: labelColor,
  fontWeight: contract.font.weight.strong,
});

export const token = style({
  display: 'block',
  fontFamily: contract.font.family.monospace,
  fontSize: contract.font.size.sm,
  fontWeight: contract.font.weight.strong,
});

export const child = recipe({
  variants: {
    hasMinHeight: {
      false: {},
      true: {
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        minHeight,
      },
    },
  },
});
