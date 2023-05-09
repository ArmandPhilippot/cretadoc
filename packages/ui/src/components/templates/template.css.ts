import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const header = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  padding: contract.spacing.md,
});

export const navbar = style({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: contract.spacing.md,
});

export const main = style({
  flex: 1,
  width: `min(calc(${contract.size.full} - 2 * ${contract.spacing.md}), ${contract.size.prose})`,
  marginInline: 'auto',
  paddingBlock: `clamp(${contract.spacing.md}, 3vw, ${contract.spacing.xl})`,
});

globalStyle(`${main} > * + *`, {
  marginBlockStart: contract.spacing.md,
});

export const footer = style({
  padding: contract.spacing.md,
});
