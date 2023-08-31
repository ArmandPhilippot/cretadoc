import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    gap: contract.spacing.md,
    padding: contract.spacing.xs,
  },
  variants: {
    hasSpaceBetween: {
      false: {},
      true: {
        justifyContent: 'space-between',
      },
    },
    isStacked: {
      false: {
        flexFlow: 'row wrap',
      },
      true: {
        flexFlow: 'column nowrap',
      },
    },
  },
});
