import { createVar, fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../contract';

export const fontColor = createVar();
export const fontFamily = createVar();
export const fontSize = createVar();
export const fontWeight = createVar();
export const letterSpacing = createVar();
export const lineHeight = createVar();

export const preview = recipe({
  base: {
    minHeight: 'auto !important',
    paddingInline: '1rem',
    background: contract.color.background.regular.base,
    color: fallbackVar(fontColor, contract.color.foreground.regular.base),
    fontFamily: fallbackVar(fontFamily, contract.font.family.regular),
    fontSize: fallbackVar(fontSize, contract.font.size.md),
    fontWeight: fallbackVar(fontWeight, contract.font.weight.regular),
    letterSpacing: fallbackVar(
      letterSpacing,
      contract.font.letterSpacing.regular
    ),
    lineHeight: fallbackVar(lineHeight, contract.font.lineHeight.md),
  },
});
