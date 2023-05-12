import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../../../../themes';

export const panel = style({
  boxShadow: contract.shadow.regular.bottom.right.elevated,
});

globalStyle(`${panel} > *:not(button)`, {
  paddingInline: contract.spacing.xs,
});
