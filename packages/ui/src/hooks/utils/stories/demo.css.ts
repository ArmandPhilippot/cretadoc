import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const panelWidth = createVar();
const panelGap = createVar();

export const wrapper = recipe({
  base: {
    vars: {
      [panelGap]: contract.spacing.md,
    },
    gap: panelGap,
  },
  variants: {
    isGrid: {
      false: {
        display: 'flex',
        flexFlow: 'row wrap',
      },
      true: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${fallbackVar(
          panelWidth,
          `calc(400px - ${panelGap})`
        )}), 1fr))`,
      },
    },
  },
});

const flexWrapper = wrapper({ isGrid: false }).split(' ')[1] ?? 'should-exist';

export const panel = style({
  selectors: {
    [`${flexWrapper} &`]: {
      flex: 1,
      flexBasis: fallbackVar(panelWidth, '0%'),
    },
  },
});

export const heading = style({
  marginBottom: contract.spacing.md,
  fontWeight: contract.font.weight.regular,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
});
