import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../themes';

export const titleColor = createVar();

export const wrapper = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    isInline: {
      false: {
        flexFlow: 'column nowrap',
        gap: contract.spacing.xs,
      },
      true: {
        flexFlow: 'row wrap',
        alignItems: 'center',
        gap: contract.spacing.md,
      },
    },
  },
});

export const title = style({
  color: titleColor,
  fontWeight: contract.font.weight.strong,
});
