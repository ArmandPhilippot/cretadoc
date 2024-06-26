import { createVar, fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../contract';

export const background = createVar();
export const borderColor = createVar();
export const foreground = createVar();

export const preview = recipe({
  base: {
    minWidth: 250,
    background: fallbackVar(background, contract.color.background.regular.base),
    color: fallbackVar(foreground, contract.color.foreground.regular.base),
  },
  variants: {
    hasBorders: {
      false: {},
      true: {
        borderColor,
        borderStyle: 'solid',
        borderWidth: contract.border.size.md,
      },
    },
    isForegroundOnly: {
      false: {
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        minHeight: 80,
      },
      true: {},
    },
  },
});
