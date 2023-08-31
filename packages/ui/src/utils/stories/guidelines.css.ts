import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const guidelines = style({
  width: 'fit-content',
  borderColor: contract.color.borders.regular.base,
  borderStyle: contract.border.style.regular,
  borderWidth: contract.border.size.sm,
});

globalStyle(`${guidelines} > *:not(:first-child)`, {
  paddingInlineStart: contract.spacing.md,
  borderInlineStartColor: contract.color.borders.regular.base,
  borderInlineStartStyle: contract.border.style.regular,
  borderInlineStartWidth: contract.border.size.sm,
});
