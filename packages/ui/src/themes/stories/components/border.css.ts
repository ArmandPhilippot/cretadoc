import { createVar, fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../contract';

export const borderColor = createVar();
export const borderRadius = createVar();
export const borderStyle = createVar();
export const borderWidth = createVar();

export const preview = recipe({
  base: {
    background: contract.color.background.regular.base,
    borderColor: fallbackVar(borderColor, contract.color.borders.regular.base),
    borderRadius: fallbackVar(borderRadius, contract.border.radius.sharp),
    borderStyle: fallbackVar(borderStyle, contract.border.style.regular),
    borderWidth: fallbackVar(borderWidth, contract.border.size.md),
  },
});
