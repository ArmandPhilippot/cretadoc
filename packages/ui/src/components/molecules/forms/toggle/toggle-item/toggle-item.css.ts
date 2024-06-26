import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../../themes';
import { visuallyHidden } from '../../../../atoms/typography/visually-hidden/visually-hidden.css';

export const checkbox = style([visuallyHidden({ isFocusable: false }), {}]);

export const item = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
    placeItems: 'center',
    placeContent: 'center',
    padding: contract.spacing.xxs,
    borderStyle: contract.border.style.regular,
    borderWidth: contract.border.size.sm,
    cursor: 'pointer',
    transitionDuration: contract.animation.duration.fast,
    transitionProperty: 'all',
    transitionTimingFunction: contract.animation.timing.easeInOut,
    selectors: {
      '&:not(:first-child)': {
        marginInlineStart: `calc(${contract.border.size.sm} * -1)`,
      },
    },
  },
  variants: {
    isChecked: {
      false: {
        borderColor: contract.color.borders.regular.light,
      },
      true: {},
    },
    isDisabled: {
      false: {},
      true: {
        background: contract.color.background.muted,
        color: contract.color.foreground.onMuted,
        pointerEvents: 'none',
      },
    },
  },
  compoundVariants: [
    {
      variants: { isChecked: true, isDisabled: false },
      style: {
        background: contract.color.primary.light,
        borderColor: contract.color.primary.dark,
        color: contract.color.foreground.onPrimary.light,
        ':hover': {
          background: contract.color.primary.base,
          borderColor: contract.color.primary.dark,
          color: contract.color.foreground.onPrimary.base,
        },
        selectors: {
          [`${checkbox}:focus + &`]: {
            background: contract.color.primary.base,
            borderColor: contract.color.primary.dark,
            color: contract.color.foreground.onPrimary.base,
          },
        },
      },
    },
    {
      variants: { isChecked: false, isDisabled: false },
      style: {
        ':hover': {
          background: contract.color.background.regular.light,
          borderColor: contract.color.borders.regular.base,
        },
        selectors: {
          [`${checkbox}:focus + &`]: {
            background: contract.color.background.regular.light,
            borderColor: contract.color.borders.regular.base,
          },
        },
      },
    },
  ],
});
