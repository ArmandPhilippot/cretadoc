import { style } from '@vanilla-extract/css';
import { contract } from '../../../themes';

export const wrapper = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: contract.spacing.md,
});

export const panel = style({
  flex: 1,
});

export const heading = style({
  marginBottom: contract.spacing.md,
  fontWeight: contract.font.weight.regular,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
});
