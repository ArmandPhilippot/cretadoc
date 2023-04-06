import { createVar, style } from '@vanilla-extract/css';

export const legendColor = createVar();
export const legendSize = createVar();

export const legend = style({
  color: legendColor,
  fontSize: legendSize,
});
