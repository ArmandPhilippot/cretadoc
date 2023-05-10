import { recipe } from '@vanilla-extract/recipes';
import { itemSpacing } from '../../../atoms/lists/list/list.css';
import { item } from '../nav-item/nav-item.css';

const expandedItem =
  item({ hasExpandedChildren: true }).split(' ')[1] ?? 'should-be-defined';

export const list = recipe({
  base: {
    selectors: {
      [`${expandedItem} &`]: {
        paddingBlock: itemSpacing,
      },
    },
  },
  variants: {
    alignment: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
  },
});
