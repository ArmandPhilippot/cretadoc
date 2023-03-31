import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { contract } from '../../contract';

export const iconColor = createVar();
export const iconSize = createVar();

export const preview = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeContent: 'center',
});

export const icon = style({
  width: iconSize,
  fill: fallbackVar(iconColor, contract.color.foreground.regular.base),
});
