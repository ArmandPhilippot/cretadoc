import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '1rem',
  paddingBlock: '1rem',
  paddingInline: 10,
});

export const lineBreak = style({
  width: '100%',
  margin: 0,
  color: 'transparent',
});
