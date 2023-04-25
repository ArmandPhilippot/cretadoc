import { style } from '@vanilla-extract/css';
import { itemSpacing } from '../../../atoms/lists/list/list.css';

export const item = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: itemSpacing,
});
