import { style } from '@vanilla-extract/css';
import { contract } from '../../../../themes';

export const select = style({
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
  cursor: 'pointer',
  ':hover': {
    background: contract.color.background.regular.light,
  },
  ':focus': {
    background: contract.color.background.regular.light,
  },
  ':disabled': {
    cursor: 'disabled',
    background: contract.color.background.muted,
    color: contract.color.foreground.onMuted,
  },
});
