import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const heading = recipe({
  base: {
    marginBottom: contract.spacing.md,
    marginTop: 0,
    color: contract.color.foreground.regular.base,
    fontWeight: contract.font.weight.regular,
    selectors: {
      '& + &': {
        marginTop: contract.spacing.md,
      },
    },
  },
  variants: {
    level: {
      '1': {
        fontSize: contract.font.size.xxl,
      },
      '2': {
        fontSize: contract.font.size.xl,
      },
      '3': {
        fontSize: contract.font.size.lg,
      },
      '4': {
        fontSize: contract.font.size.md,
      },
      '5': {
        fontSize: contract.font.size.md,
        fontWeight: contract.font.weight.strong,
      },
      '6': {
        fontSize: contract.font.size.sm,
      },
    },
  },
});
