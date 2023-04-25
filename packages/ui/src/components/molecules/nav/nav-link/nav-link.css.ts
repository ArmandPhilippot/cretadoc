import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const link = recipe({
  base: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
  variants: {
    isDisabled: {
      false: {},
      true: {},
    },
    isSelected: {
      false: {},
      true: {},
    },
    radiusOn: {
      both: {
        borderRadius: contract.border.radius.softer,
      },
      left: {
        borderTopLeftRadius: contract.border.radius.softer,
        borderBottomLeftRadius: contract.border.radius.softer,
      },
      right: {
        borderTopRightRadius: contract.border.radius.softer,
        borderBottomRightRadius: contract.border.radius.softer,
      },
    },
    variant: {
      block: {
        paddingBlock: contract.spacing.xxs,
        paddingInline: contract.spacing.sm,
        fontWeight: contract.font.weight.strong,
        width: '100%',
      },
      regular: {
        width: 'fit-content',
      },
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'block', isSelected: true },
      style: {
        background: contract.color.primary.base,
        color: contract.color.foreground.onPrimary.base,
      },
    },
    {
      variants: { variant: 'block', isDisabled: false, isSelected: true },
      style: {
        ':hover': {
          background: contract.color.primary.light,
          color: contract.color.foreground.onPrimary.light,
        },
        ':focus': {
          background: contract.color.primary.light,
          color: contract.color.foreground.onPrimary.light,
        },
        ':active': {
          background: contract.color.primary.dark,
          color: contract.color.foreground.onPrimary.dark,
        },
      },
    },
    {
      variants: { variant: 'regular', isSelected: true },
      style: {
        borderBottomStyle: contract.border.style.regular,
        borderBottomWidth: contract.border.size.md,
      },
    },
    {
      variants: { variant: 'regular', isDisabled: false, isSelected: true },
      style: {
        borderBottomColor: contract.color.primary.base,
      },
    },
    {
      variants: { variant: 'regular', isDisabled: true, isSelected: true },
      style: {
        borderBottomColor: contract.color.foreground.regular.base,
      },
    },
  ],
});
