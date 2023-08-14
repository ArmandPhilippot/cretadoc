import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '1rem',
  marginInline: 'auto',
});

export const pre = style({
  position: 'relative',
  overflow: 'auto',
  hyphens: 'none',
  tabSize: 4,
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  wordWrap: 'normal',
});
