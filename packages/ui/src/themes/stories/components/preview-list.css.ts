import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '0.5rem',
    marginBlock: '1.5rem',
  },
  variants: {
    isBordered: {
      false: {},
      true: {
        paddingBlock: '0.5rem',
        paddingInline: '1rem',
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderWidth: 1,
      },
    },
  },
});

export const lineBreak = style({
  width: '100%',
  margin: 0,
  color: 'transparent',
});
