import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';
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

const expandedItem =
  item({ hasExpandedChildren: true }).split(' ')[1] ?? 'should-exist';

export const collapsible = style({
  flex: 1,
});

export const collapsibleBody = style({
  borderBlockColor: contract.color.primary.base,
  borderBlockStyle: contract.border.style.regular,
  borderBlockWidth: contract.border.size.sm,
});

export const expandBtn = style({
  borderColor: contract.color.primary.base,
  borderStyle: contract.border.style.regular,
  borderWidth: 0,
  borderLeftWidth: contract.border.size.sm,
  selectors: {
    [`${expandedItem} &`]: {
      borderTopWidth: contract.border.size.sm,
      borderRightWidth: contract.border.size.sm,
    },
  },
});

export const sep = style({
  alignSelf: 'center',
  marginLeft: itemSpacing,
});
