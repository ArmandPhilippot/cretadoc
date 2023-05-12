import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const nav = recipe({
  base: {},
  variants: {
    isCollapsible: {
      false: {
        padding: contract.spacing.xs,
      },
      true: {
        borderColor: contract.color.borders.regular.light,
        borderStyle: contract.border.style.regular,
        borderWidth: contract.border.size.sm,
      },
    },
  },
});

const regularNav = nav({ isCollapsible: false }).split(' ')[1] ?? 'should-exit';

const collapsibleNav =
  nav({ isCollapsible: true }).split(' ')[1] ?? 'should-exit';

export const collapsibleSummary = recipe({
  base: {
    padding: contract.spacing.xxs,
    ':hover': {
      background: contract.color.background.regular.light,
    },
  },
  variants: {
    isExpanded: {
      false: {},
      true: {
        borderBottomColor: contract.color.borders.regular.light,
        borderBottomStyle: contract.border.style.regular,
        borderBottomWidth: contract.border.size.sm,
      },
    },
  },
});

export const collapsibleBody = style({
  paddingInline: contract.spacing.xs,
});

export const list = style({
  selectors: {
    [`${collapsibleNav} &`]: {
      marginBlock: contract.spacing.xs,
    },
    [`${collapsibleNav} & &`]: {
      marginBlock: 0,
    },
    [`${regularNav} &`]: {
      marginBlockStart: contract.spacing.xxs,
    },
    [`${regularNav} & &`]: {
      marginBlockStart: 0,
    },
  },
});
