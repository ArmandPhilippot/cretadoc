import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { contract } from '../../../themes';

export const maxCardWidth = createVar();

export const list = style({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${fallbackVar(
    maxCardWidth,
    '35ch'
  )}), 1fr))`,
  gap: contract.spacing.md,
});
