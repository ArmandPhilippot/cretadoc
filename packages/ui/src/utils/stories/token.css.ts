import { style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const token = style({
  display: 'block',
  fontFamily: contract.font.family.monospace,
  fontSize: contract.font.size.sm,
  fontWeight: contract.font.weight.strong,
});
