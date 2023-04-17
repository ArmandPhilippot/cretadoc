import { type RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const form = recipe({
  base: {
    display: 'flex',
    width: 'fit-content',
  },
  variants: {
    buttonPosition: {
      center: {
        placeItems: 'center',
      },
      end: {
        placeItems: 'flex-end',
      },
      start: {
        placeItems: 'flex-start',
      },
      stretch: {
        placeItems: 'stretch',
      },
    },
    hasSpacing: {
      false: {},
      true: {
        gap: contract.spacing.xxs,
      },
    },
    layout: {
      column: {
        flexFlow: 'column wrap',
      },
      row: {
        flexFlow: 'row wrap',
      },
    },
  },
});

export type FormVariants = NonNullable<RecipeVariants<typeof form>>;
