import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { contract } from '../../contract';

export const spacing = createVar();

export const spacingPreview = style({
  height: fallbackVar(spacing, contract.spacing.md),
  minHeight: 'auto !important',
  background: contract.color.primary.base,
});

export const marginPreview = style({
  gap: fallbackVar(spacing, contract.spacing.md),
});

export const marginBoxes = style({
  width: 70,
  height: '100%',
  background: contract.color.primary.base,
});

export const paddingPreview = style({
  gap: fallbackVar(spacing, contract.spacing.md),
});

export const paddingBox = style({
  width: '100%',
  height: 30,
  background: contract.color.background.regular.base,
  borderColor: contract.color.primary.base,
  borderStyle: 'solid',
  borderWidth: fallbackVar(spacing, contract.spacing.md),
});
