import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const field = recipe({
  base: {
    boxSizing: 'border-box',
    maxWidth: '100%',
    padding: contract.spacing.xs,
    background: contract.color.background.regular.base,
    borderColor: contract.color.foreground.regular.base,
    borderRadius: contract.border.radius.soft,
    borderStyle: contract.border.style.regular,
    borderWidth: contract.border.size.sm,
    color: contract.color.foreground.regular.base,
    fontFamily: contract.font.family.regular,
    fontSize: contract.font.size.md,
    lineHeight: contract.font.lineHeight.md,
    ':disabled': {
      cursor: 'not-allowed',
      background: contract.color.background.muted,
      color: contract.color.foreground.onMuted,
    },
    '::placeholder': {
      color: contract.color.foreground.muted,
    },
  },
  variants: {
    isSelect: {
      false: {
        ':focus-visible': {
          outline: 'none',
          borderColor: contract.color.primary.base,
        },
        ':read-only': {
          background: contract.color.background.muted,
          color: contract.color.foreground.onMuted,
        },
      },
      true: {},
    },
    isTextArea: {
      false: {},
      true: {
        minHeight: 150,
      },
    },
  },
});
