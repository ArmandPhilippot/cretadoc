import { createVar, style } from '@vanilla-extract/css';

export const maxWidth = createVar();

export const txt = style({
  display: 'inline-block',
  maxWidth,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
