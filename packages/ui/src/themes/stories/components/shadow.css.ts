import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { contract } from '../../contract';

export const borderColor = createVar();
export const boxShadow = createVar();

export const box = style({
  width: 150,
  height: 80,
  margin: '0.5rem',
  borderColor: fallbackVar(borderColor, contract.color.borders.regular.base),
  borderStyle: 'solid',
  borderWidth: 1,
  boxShadow,
});
