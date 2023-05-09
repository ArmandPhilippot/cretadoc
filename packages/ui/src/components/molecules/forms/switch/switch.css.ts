import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const fieldset = style({
  margin: 0,
  padding: 0,
  border: 'none',
});

export const legend = style({
  marginBlockEnd: contract.spacing.xs,
});

export const group = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: 'fit-content',
    position: 'relative',
    borderRadius: contract.border.radius.pill,
    borderStyle: contract.border.style.regular,
    borderWidth: contract.border.size.md,
    cursor: 'pointer',
  },
  variants: {
    isDisabled: {
      false: {
        borderColor: contract.color.primary.base,
        ':focus-within': {
          borderColor: contract.color.primary.light,
        },
        ':hover': {
          borderColor: contract.color.primary.light,
        },
      },
      true: {
        borderColor: contract.color.borders.muted,
      },
    },
  },
});
