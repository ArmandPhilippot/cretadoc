import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const drawer = recipe({
  base: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: `min(80vw, ${contract.size.sidebar})`,
    height: '100%',
    position: 'fixed',
    insetBlock: 0,
    left: 0,
    overflowY: 'auto',
    background: contract.color.background.regular.base,
    borderRightColor: contract.color.borders.regular.light,
    borderRightStyle: contract.border.style.regular,
    transitionDuration: contract.animation.duration.slow,
    transitionTimingFunction: contract.animation.timing.easeInOut,
    transitionDelay: '0s',
  },
  variants: {
    isOpen: {
      false: {
        borderRightWidth: 0,
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateX(-100%)',
        transitionProperty: 'all',
      },
      true: {
        borderRightWidth: contract.border.size.sm,
        transitionProperty: 'transform',
      },
    },
  },
});

const closedDrawer = drawer({ isOpen: false }).split(' ')[1] ?? '';

globalStyle(`${closedDrawer} *`, {
  visibility: 'hidden',
});

export const content = style({
  paddingBlock: contract.spacing.md,
});

export const btn = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeContent: 'center',
  width: '100%',
  padding: contract.spacing.xs,
  marginTop: 'auto',
  position: 'sticky',
  bottom: 0,
  background: contract.color.background.regular.base,
  borderTopColor: contract.color.primary.base,
  borderTopStyle: contract.border.style.regular,
  borderTopWidth: contract.border.size.sm,
  ':hover': {
    background: contract.color.background.regular.light,
  },
  ':focus': {
    background: contract.color.background.regular.light,
  },
  ':active': {
    background: contract.color.background.regular.dark,
  },
});
