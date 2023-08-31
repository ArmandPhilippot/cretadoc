import { style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const form = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: contract.spacing.sm,
});
