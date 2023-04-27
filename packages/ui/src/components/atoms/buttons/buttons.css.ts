import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

const mutedPrimaryButton = style({
  backgroundColor: contract.color.background.muted,
  borderColor: contract.color.borders.muted,
  color: contract.color.foreground.onMuted,
});

const mutedSecondaryButton = style({
  borderColor: contract.color.borders.muted,
  color: contract.color.foreground.muted,
});

export const button = recipe({
  base: {
    fontFamily: contract.font.family.regular,
    fontSize: contract.font.size.md,
    lineHeight: contract.font.lineHeight.md,
    textDecoration: 'none',
  },
  variants: {
    kind: {
      neutral: {
        backgroundColor: 'transparent',
        border: 'none',
        color: contract.color.foreground.regular.base,
      },
      primary: {
        paddingBlock: contract.spacing.xxs,
        paddingInline: contract.spacing.xs,
        borderStyle: contract.border.style.regular,
        borderWidth: contract.border.size.md,
        borderRadius: contract.border.radius.soft,
        fontWeight: contract.font.weight.strong,
        transitionDuration: contract.animation.duration.fast,
        transitionProperty: 'all',
        transitionTimingFunction: contract.animation.timing.easeInOut,
      },
      secondary: {
        paddingBlock: contract.spacing.xxs,
        paddingInline: contract.spacing.xs,
        backgroundColor: contract.color.background.regular.base,
        borderStyle: contract.border.style.regular,
        borderWidth: contract.border.size.md,
        borderRadius: contract.border.radius.soft,
        fontWeight: contract.font.weight.strong,
        transitionDuration: contract.animation.duration.fast,
        transitionProperty: 'all',
        transitionTimingFunction: contract.animation.timing.easeInOut,
      },
    },
    state: {
      disabled: {
        cursor: 'not-allowed',
        opacity: 0.85,
      },
      loading: {
        cursor: 'wait',
      },
      regular: {
        cursor: 'pointer',
      },
    },
  },
  compoundVariants: [
    {
      variants: { kind: 'primary', state: 'regular' },
      style: {
        backgroundColor: contract.color.primary.base,
        borderColor: contract.color.primary.base,
        color: contract.color.foreground.onPrimary.base,
        ':hover': {
          backgroundColor: contract.color.primary.light,
        },
        ':focus': {
          backgroundColor: contract.color.primary.light,
        },
        ':active': {
          backgroundColor: contract.color.primary.dark,
          transitionDuration: contract.animation.duration.medium,
        },
      },
    },
    {
      variants: { kind: 'primary', state: 'disabled' },
      style: mutedPrimaryButton,
    },
    {
      variants: { kind: 'primary', state: 'loading' },
      style: mutedPrimaryButton,
    },
    {
      variants: { kind: 'secondary', state: 'regular' },
      style: {
        borderColor: contract.color.primary.base,
        color: contract.color.primary.base,
        ':hover': {
          borderColor: contract.color.primary.light,
          color: contract.color.primary.light,
        },
        ':focus': {
          borderColor: contract.color.primary.light,
          color: contract.color.primary.light,
        },
        ':active': {
          borderColor: contract.color.primary.dark,
          color: contract.color.primary.dark,
        },
      },
    },
    {
      variants: { kind: 'secondary', state: 'disabled' },
      style: mutedSecondaryButton,
    },
    {
      variants: { kind: 'secondary', state: 'loading' },
      style: mutedSecondaryButton,
    },
  ],
});
