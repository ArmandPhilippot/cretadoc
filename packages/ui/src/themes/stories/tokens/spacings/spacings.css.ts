import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../contract';

export const spacing = createVar();

export const marginBoxesWrapper = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: fallbackVar(spacing, contract.spacing.md),
  height: 30,
});

export const box = recipe({
  base: {},
  variants: {
    isMargin: {
      false: {},
      true: {
        width: 70,
        height: '100%',
        background: contract.color.primary.base,
      },
    },
    isPadding: {
      false: {},
      true: {
        width: '100%',
        height: 30,
        background: contract.color.background.regular.base,
        borderColor: contract.color.primary.base,
        borderStyle: 'solid',
        borderWidth: fallbackVar(spacing, contract.spacing.md),
      },
    },
  },
  compoundVariants: [
    {
      variants: { isMargin: false, isPadding: false },
      style: {
        height: fallbackVar(spacing, contract.spacing.md),
        background: contract.color.primary.base,
      },
    },
  ],
});
