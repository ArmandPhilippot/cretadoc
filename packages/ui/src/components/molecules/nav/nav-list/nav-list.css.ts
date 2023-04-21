import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const list = recipe({
  variants: {
    isInline: {
      false: {},
      true: {
        gap: contract.spacing.sm,
      },
    },
  },
});
