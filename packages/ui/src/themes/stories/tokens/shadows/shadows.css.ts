import { createVar, style } from '@vanilla-extract/css';
import { contract } from '../../../contract';

export const background = createVar();
export const boxShadow = createVar();

export const wrapper = style({
  background,
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
});

export const box = style({
  width: 150,
  height: 80,
  margin: '0.5rem',
  background: contract.color.background.regular.base,
  boxShadow,
});
