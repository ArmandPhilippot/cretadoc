import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  overflowY: 'auto',
  zIndex: 100,
  background: 'hsla(0, 0%, 0%, 0.6)',
});
