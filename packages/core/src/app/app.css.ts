import { contract } from '@cretadoc/ui';
import { createVar, style } from '@vanilla-extract/css';
import { BREAKPOINT } from '../utils/constants';

const navbarHeight = createVar();
export const contentsWidth = createVar();
export const sidebarGap = createVar();
export const sidebarWidth = createVar();

export const layout = style({
  vars: {
    [navbarHeight]: '0px',
  },
  gap: `clamp(${contract.spacing.md}, 5vh, ${contract.spacing.xl})`,
  paddingInline: `clamp(${contract.spacing.md}, 5vw, ${contract.spacing.xxl})`,
  '@media': {
    [`(max-width: ${BREAKPOINT.SM}px)`]: {
      vars: {
        [navbarHeight]: '70px',
      },
    },
  },
});

export const header = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: contract.spacing.md,
});

export const navbar = style({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  gap: contract.spacing.md,
  '@media': {
    [`(max-width: ${BREAKPOINT.SM}px)`]: {
      justifyContent: 'space-evenly',
      height: navbarHeight,
      position: 'fixed',
      insetInline: 0,
      bottom: 0,
      zIndex: 10,
      background: contract.color.background.regular.base,
      borderTopColor: contract.color.borders.regular.base,
      borderTopStyle: contract.border.style.regular,
      borderTopWidth: contract.border.size.sm,
      boxShadow: contract.shadow.regular.top.center.raised,
    },
  },
});

export const main = style({
  vars: {
    [contentsWidth]: `min(${contract.size.full}, ${contract.size.prose})`,
    [sidebarGap]: `clamp(${contract.spacing.md}, 4vw, ${contract.spacing.xxl})`,
    [sidebarWidth]: contract.size.sidebar,
  },
  flex: 1,
  display: 'grid',
  rowGap: contract.spacing.md,
  gridTemplateColumns: `2fr minmax(0, calc(${contentsWidth} + ${sidebarGap} + ${sidebarWidth})) 1fr`,
  gridTemplateRows: 'minmax(0, max-content) 1fr',
});

export const breadcrumbs = style({
  gridColumn: 2,
  gridRow: 1,
  paddingBlockStart: contract.spacing.sm,
});

export const footer = style({
  paddingBlock: contract.spacing.md,
  paddingBottom: `calc(${contract.spacing.md} + ${navbarHeight})`,
});

export const backToTop = style({
  '@media': {
    [`(max-width: ${BREAKPOINT.SM}px)`]: {
      bottom: `calc(${navbarHeight} + ${contract.spacing.md})`,
    },
  },
});
