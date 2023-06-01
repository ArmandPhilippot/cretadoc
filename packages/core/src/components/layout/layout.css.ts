import { contract } from '@cretadoc/ui';
import { style } from '@vanilla-extract/css';

export const main = style({
  flex: 1,
});

export const header = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: contract.spacing.md,
});
