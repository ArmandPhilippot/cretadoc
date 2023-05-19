import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../themes';
import { BREAKPOINT } from './template.breakpoints';

const navbarHeight = createVar();
const inlinePadding = createVar();

export const layout = recipe({
  base: {
    vars: {
      [inlinePadding]: `clamp(${contract.spacing.md}, 5vw, ${contract.spacing.xxl})`,
      [navbarHeight]: '0px',
    },
    gap: `clamp(${contract.spacing.md}, 5vh, ${contract.spacing.xl})`,
    paddingInline: inlinePadding,
    '@media': {
      [`(max-width: ${BREAKPOINT.SM}px)`]: {
        vars: {
          [navbarHeight]: '70px',
        },
      },
    },
  },
  variants: {
    hasTwoColumns: {
      false: {},
      true: {},
    },
  },
});

const singleColumnLayout = layout({ hasTwoColumns: false }).split(' ')[1] ?? '';
const twoColumnsLayout = layout({ hasTwoColumns: true }).split(' ')[1] ?? '';

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

const pageWidth = createVar();
const sidebarWidth = createVar();
const pageSidebarGap = createVar();

export const main = style({
  vars: {
    [pageSidebarGap]: `clamp(${contract.spacing.md}, 3vw, ${contract.spacing.xxl})`,
    [pageWidth]: `min(${contract.size.full}, ${contract.size.prose})`,
    [sidebarWidth]: `min(calc(${contract.size.full} - ${pageWidth}), ${contract.size.sidebar})`,
  },
  flex: 1,
  '@media': {
    [`(min-width: ${BREAKPOINT.MD}px)`]: {
      display: 'grid',
      selectors: {
        [`${singleColumnLayout} &`]: {
          gridTemplateColumns: `1fr ${pageWidth} 1fr`,
        },
        [`${twoColumnsLayout} &`]: {
          gridTemplateColumns: `10fr calc(${pageWidth} + ${sidebarWidth} + ${pageSidebarGap}) 1fr`,
        },
      },
    },
  },
});

export const breadcrumbs = style({
  gridColumn: 2,
  marginBlockEnd: contract.spacing.md,
});

export const page = recipe({
  base: {
    gridColumn: 2,
    display: 'grid',
    gridTemplateRows: 'max-content',
    rowGap: contract.spacing.md,
  },
  variants: {
    hasTwoColumns: {
      false: {
        gridTemplateColumns: `minmax(0, ${pageWidth})`,
      },
      true: {
        columnGap: pageSidebarGap,
        gridTemplateColumns: `minmax(15%, ${pageWidth}) minmax(0, ${sidebarWidth})`,
        position: 'relative',
      },
    },
  },
});

const singleColumnPage = page({ hasTwoColumns: false }).split(' ')[1] ?? '';
const twoColumnsPage = page({ hasTwoColumns: true }).split(' ')[1] ?? '';

export const sidebar = style({
  selectors: {
    [`${singleColumnPage} &`]: {
      gridColumn: 1,
    },
    [`${twoColumnsPage} &`]: {
      gridColumn: 2,
      position: 'absolute',
      insetBlock: 0,
    },
  },
});

globalStyle(`${page({})} > *:not(${sidebar})`, {
  gridColumn: 1,
});

globalStyle(`${page({})} > * > *:not(img)`, {
  marginBlock: contract.spacing.md,
});

globalStyle(`${page({})} > * > *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`${page({})} > * > *:last-child`, {
  marginBlockEnd: 0,
});

export const toc = style({
  '@media': {
    [`(min-width: ${BREAKPOINT.MD}px)`]: {
      position: 'sticky',
      top: contract.spacing.md,
    },
  },
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
