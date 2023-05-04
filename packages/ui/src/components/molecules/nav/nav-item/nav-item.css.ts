import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { itemSpacing } from '../../../atoms/lists/list/list.css';

export const item = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  variants: {
    hasExpandedChildren: {
      false: {},
      true: {},
    },
  },
});

export const sep = style({
  alignSelf: 'center',
  marginLeft: itemSpacing,
});
