import { style } from '@vanilla-extract/css';
import { contract } from '../../../../themes';

export const btn = style({
  ':focus': {
    position: 'absolute',
    top: contract.spacing.sm,
    left: contract.spacing.sm,
  },
});
