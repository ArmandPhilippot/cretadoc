import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '0.5rem',
  marginBlock: '1.5rem',
});

export const lineBreak = style({
  width: '100%',
  color: 'transparent',
});
