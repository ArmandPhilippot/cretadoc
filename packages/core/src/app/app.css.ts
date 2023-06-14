import { contract } from '@cretadoc/ui';
import { style } from '@vanilla-extract/css';

export const layout = style({
  paddingInline: `clamp(${contract.spacing.md}, 5vw, ${contract.spacing.xxl})`,
});

export const header = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: contract.spacing.md,
});

export const main = style({
  flex: 1,
});

export const breadcrumbs = style({
  marginBlockEnd: contract.spacing.md,
});

export const footer = style({
  paddingBlock: contract.spacing.md,
});
