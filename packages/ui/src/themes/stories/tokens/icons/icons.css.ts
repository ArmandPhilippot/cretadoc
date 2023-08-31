import { createVar, style } from '@vanilla-extract/css';

export const iconSize = createVar();

export const icon = style({
  width: iconSize,
  placeSelf: 'center',
});
