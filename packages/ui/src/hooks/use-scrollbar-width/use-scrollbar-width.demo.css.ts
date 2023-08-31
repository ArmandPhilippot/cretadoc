import { style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const preview = style({
  flex: `1 1 calc(50% - ${contract.spacing.md})`,
});

export const box = style({
  width: 200,
  height: 150,
  padding: contract.spacing.md,
  borderColor: contract.color.borders.regular.base,
  borderStyle: contract.border.style.regular,
  borderWidth: contract.border.size.md,
  textAlign: 'center',
});
