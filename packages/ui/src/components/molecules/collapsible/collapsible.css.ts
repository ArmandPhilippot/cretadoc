import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const wrapper = style({
  display: 'flex',
  flexFlow: 'column wrap',
  width: '100%',
});

export const summary = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: 0,
  color: contract.color.primary.base,
});

export const btn = recipe({
  base: {
    height: '100%',
    paddingInline: contract.spacing.xs,
    borderLeftColor: contract.color.primary.base,
    borderLeftStyle: contract.border.style.regular,
    borderLeftWidth: contract.border.size.sm,
    transitionProperty: 'all',
    transitionDuration: contract.animation.duration.fast,
    transitionTimingFunction: contract.animation.timing.linear,
    ':hover': {
      background: contract.color.background.regular.light,
    },
    ':focus': {
      background: contract.color.background.regular.light,
    },
    ':active': {
      background: contract.color.background.regular.dark,
    },
  },
  variants: {
    isExpanded: {
      false: { borderTopWidth: 0 },
      true: {
        borderTopColor: contract.color.primary.base,
        borderTopStyle: contract.border.style.regular,
        borderTopWidth: contract.border.size.sm,
        borderRightColor: contract.color.primary.base,
        borderRightStyle: contract.border.style.regular,
        borderRightWidth: contract.border.size.sm,
      },
    },
  },
});

export const body = recipe({
  base: {
    transitionDuration: `${contract.animation.duration.medium}, ${contract.animation.duration.fast}`,
    transitionProperty: 'all, padding',
    transitionTimingFunction: `${contract.animation.timing.easeInOut}, ${contract.animation.timing.linear}`,
  },
  variants: {
    isExpanded: {
      false: {
        maxHeight: 0,
        padding: 0,
        visibility: 'hidden',
        opacity: 0,
        overflow: 'hidden',
        borderWidth: 0,
      },
      true: {
        maxHeight: '95vh',
        borderBlockColor: contract.color.primary.base,
        borderBlockStyle: contract.border.style.regular,
        borderBlockWidth: contract.border.size.sm,
        visibility: 'visible',
        opacity: 1,
      },
    },
  },
});
