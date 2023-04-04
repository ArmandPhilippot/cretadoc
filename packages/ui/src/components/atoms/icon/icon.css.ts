import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const iconColor = createVar();
export const iconSize = createVar();

export const icon = recipe({
  base: {
    width: iconSize,
    height: iconSize,
  },
  variants: {
    shape: {
      hamburger: {
        stroke: iconColor,
        strokeWidth: 2,
      },
    },
  },
});
