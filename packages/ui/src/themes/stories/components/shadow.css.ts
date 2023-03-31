import { createVar, fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../contract';

export const borderColor = createVar();
export const boxShadow = createVar();

export const box = recipe({
  base: {
    width: 150,
    height: 80,
    margin: '0.5rem',
    borderColor: fallbackVar(borderColor, contract.color.borders.regular.base),
    borderStyle: 'solid',
    borderWidth: 1,
  },
  variants: {
    hasShadow: {
      false: {
        alignSelf: 'end',
      },
      true: {
        boxShadow,
      },
    },
  },
});
