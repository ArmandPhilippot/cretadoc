import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../../themes';
import { visuallyHidden } from '../../../../atoms/typography/visually-hidden/visually-hidden.css';
import { group } from '../switch.css';

export const item = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
    placeContent: 'center',
    placeItems: 'center',
    padding: contract.spacing.xxs,
    position: 'relative',
    fontWeight: contract.font.weight.strong,
    transitionDuration: contract.animation.duration.fast,
    transitionProperty: 'all',
    transitionTimingFunction: contract.animation.timing.easeInOut,
    '::before': {
      content: '',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      borderRadius: contract.border.radius.pill,
      transitionDuration: contract.animation.duration.fast,
      transitionProperty: 'all',
      transitionTimingFunction: contract.animation.timing.easeInOut,
    },
  },
  variants: {
    isDisabled: {
      false: {
        cursor: 'pointer',
        '::before': {
          background: contract.color.primary.base,
        },
        selectors: {
          [`${group({})}:focus-within &::before`]: {
            background: contract.color.primary.light,
          },
          [`${group({})}:hover &::before`]: {
            background: contract.color.primary.light,
          },
        },
      },
      true: {
        cursor: 'not-allowed',
        '::before': {
          background: contract.color.background.muted,
        },
      },
    },
    isSelected: {
      false: {
        selectors: {
          '&:first-child::before': {
            left: '100%',
          },
          '&:last-child::before': {
            right: '100%',
          },
        },
      },
      true: {
        selectors: {
          '&:first-child::before': {
            left: 0,
          },
          '&:last-child::before': {
            right: 0,
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: { isDisabled: false, isSelected: false },
      style: {
        color: contract.color.primary.base,
      },
    },
    {
      variants: { isDisabled: true, isSelected: false },
      style: {
        color: contract.color.foreground.muted,
      },
    },
    {
      variants: { isDisabled: false, isSelected: true },
      style: {
        color: contract.color.foreground.onPrimary.base,
      },
    },
    {
      variants: { isDisabled: true, isSelected: true },
      style: {
        color: contract.color.foreground.onMuted,
      },
    },
  ],
});

export const radio = visuallyHidden({ isFocusable: false });

export const label = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeContent: 'center',
  placeItems: 'center',
  position: 'relative',
  zIndex: 1,
  pointerEvents: 'none',
});

const unselectedItem =
  item({ isSelected: false }).split(' ')[1] ?? 'should-exit';
const selectedItem = item({ isSelected: true }).split(' ')[1] ?? 'should-exit';

globalStyle(`${selectedItem} svg`, {
  fill: contract.color.foreground.onPrimary.base,
  transitionDuration: contract.animation.duration.fast,
  transitionProperty: 'all',
  transitionTimingFunction: contract.animation.timing.easeInOut,
});

globalStyle(`${unselectedItem} svg`, {
  fill: contract.color.primary.base,
  transitionDuration: contract.animation.duration.fast,
  transitionProperty: 'all',
  transitionTimingFunction: contract.animation.timing.easeInOut,
});
