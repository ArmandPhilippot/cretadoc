import { recipe } from '@vanilla-extract/recipes';

/*
 * We need to cast types on some properties to prevent Typescript errors when
 * using `!important`.
 * @see https://github.com/vanilla-extract-css/vanilla-extract/issues/541
 * @see https://github.com/frenic/csstype/issues/114
 */
const hidden = {
  width: '1px !important',
  height: '1px !important',
  padding: '0 !important',
  margin: '-1px !important',
  overflow: 'hidden !important' as 'hidden',
  position: 'absolute !important' as 'absolute',
  border: '0 !important',
  clip: 'rect(1px, 1px, 1px, 1px) !important' as 'rect(1px, 1px, 1px, 1px)',
  clipPath: 'inset(50%) !important',
  whiteSpace: 'nowrap !important' as 'nowrap',
};

export const visuallyHidden = recipe({
  variants: {
    isFocusable: {
      false: hidden,
      true: {
        selectors: {
          '&:not(:focus):not(:focus-within)': hidden,
        },
      },
    },
  },
});
