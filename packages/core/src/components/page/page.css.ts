import { contract } from '@cretadoc/ui';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contentsWidth, sidebarGap, sidebarWidth } from '../../app/app.css';
import { BREAKPOINT } from '../../utils/constants';

export const page = recipe({
  base: {
    gridColumn: 2,
    gridRow: 2,
    display: 'grid',
    rowGap: contract.spacing.md,
    gridAutoRows: 'minmax(0, max-content)',
  },
  variants: {
    hasSidebar: {
      false: {
        gridTemplateColumns: `minmax(0, calc(${contentsWidth} + ${sidebarWidth}))`,
      },
      true: {
        gridTemplateColumns: contentsWidth,
        '@media': {
          [`(min-width: ${BREAKPOINT.MD}px)`]: {
            gridTemplateColumns: `${contentsWidth} minmax(0, ${sidebarWidth})`,
            columnGap: sidebarGap,
          },
        },
      },
    },
  },
});

export const firstColumn = style({
  gridColumn: 1,
});

export const secondColumn = style({
  gridColumn: 1,
  '@media': {
    [`(min-width: ${BREAKPOINT.MD}px)`]: {
      gridColumn: 2,
      gridRowStart: 1,
      gridRowEnd: 'span 2',
    },
  },
});

export const sidebar = style({
  '@media': {
    [`(min-width: ${BREAKPOINT.MD}px)`]: {},
  },
});

export const contents = style({});

export const toc = style({
  '@media': {
    [`(min-width: ${BREAKPOINT.MD}px)`]: {
      position: 'sticky',
      top: contract.spacing.md,
    },
  },
});

globalStyle(`${contents} > *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`${contents} > *:last-child`, {
  marginBlockEnd: 0,
});
