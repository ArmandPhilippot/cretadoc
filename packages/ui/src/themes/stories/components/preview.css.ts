import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexFlow: 'column wrap',
  placeItems: 'center',
});

export const preview = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeItems: 'center',
  justifyContent: 'center',
  minWidth: 250,
  minHeight: 100,
});

export const token = style({
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
  marginBlock: 10,
});
