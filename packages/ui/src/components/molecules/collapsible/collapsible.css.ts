import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  variants: {
    isExpanded: {
      false: {},
      true: {},
    },
  },
});

const collapsedWrapper =
  wrapper({ isExpanded: false }).split(' ')[1] ?? 'should-exist';

const expandedWrapper =
  wrapper({ isExpanded: true }).split(' ')[1] ?? 'should-exist';

export const summary = style({
  flex: 1,
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const btn = recipe({
  base: {
    height: '100%',
    padding: 0,
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
    isFullWidth: {
      false: {
        paddingInline: contract.spacing.xs,
      },
      true: {
        flex: 1,
        placeContent: 'flex-start',
        justifyContent: 'space-between',
      },
    },
  },
});

export const body = style({
  transitionDuration: `${contract.animation.duration.medium}, ${contract.animation.duration.fast}`,
  transitionProperty: 'all, padding',
  transitionTimingFunction: `${contract.animation.timing.easeInOut}, ${contract.animation.timing.linear}`,
  selectors: {
    [`${collapsedWrapper} &`]: {
      maxHeight: 0,
      visibility: 'hidden',
      opacity: 0,
      overflow: 'hidden',
    },
    [`${expandedWrapper} &`]: {
      maxHeight: '95vh',
      visibility: 'visible',
      opacity: 1,
    },
  },
});
