import { style } from '@vanilla-extract/css';
import { contract } from '../../contract';

export const table = style({
  width: '100%',
  marginTop: 30,
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

export const title = style({
  textTransform: 'uppercase',
});

export const cell = style({
  padding: 5,
  borderColor: contract.color.borders.regular.base,
  borderStyle: contract.border.style.regular,
  borderWidth: contract.border.size.md,
  selectors: {
    '&:not(:first-child)': {
      textAlign: 'center',
    },
  },
});
