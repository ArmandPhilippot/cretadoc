import { style } from '@vanilla-extract/css';
import { itemSpacing } from '../../../atoms/lists/list/list.css';
import { item } from '../nav-item/nav-item.css';

const expandedItem =
  item({ hasExpandedChildren: true }).split(' ')[1] ?? 'should-be-defined';

export const list = style({
  selectors: {
    [`${expandedItem} &`]: {
      paddingBlock: itemSpacing,
    },
  },
});
