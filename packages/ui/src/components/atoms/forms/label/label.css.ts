import { createVar, style } from '@vanilla-extract/css';
import { contract } from '../../../../themes';

export const labelColor = createVar();
export const labelSize = createVar();

export const label = style({
  color: labelColor,
  fontSize: labelSize,
});

export const required = style({
  color: contract.color.foreground.critical,
});
