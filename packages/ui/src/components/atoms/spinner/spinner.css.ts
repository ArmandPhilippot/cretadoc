import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const wrapper = recipe({
  base: {
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    width: 'fit-content',
    cursor: 'wait',
  },
  variants: {
    position: {
      bottom: {
        flexFlow: 'column nowrap',
        flexDirection: 'column-reverse',
      },
      left: {
        flexFlow: 'row nowrap',
      },
      right: {
        flexFlow: 'row nowrap',
        flexDirection: 'row-reverse',
      },
      top: {
        flexFlow: 'column nowrap',
      },
    },
    size: {
      xs: {
        gap: contract.spacing.xxs,
        fontSize: contract.font.size.sm,
      },
      sm: {
        gap: contract.spacing.xs,
        fontSize: contract.font.size.md,
      },
      md: {
        gap: contract.spacing.xs,
        fontSize: contract.font.size.lg,
      },
      lg: {
        gap: contract.spacing.sm,
        fontSize: contract.font.size.xl,
      },
      xl: {
        gap: contract.spacing.sm,
        fontSize: contract.font.size.xxl,
      },
    },
  },
});

const rotate = keyframes({
  '100%': { transform: 'rotate(1turn)' },
});

export const size = createVar();

export const spinner = style({
  width: size,
  aspectRatio: '1/1',
  borderRadius: '50%',
  borderWidth: contract.border.size.lg,
  borderStyle: contract.border.style.regular,
  borderColor: contract.color.background.muted,
  borderTopColor: contract.color.primary.base,
  animationName: rotate,
  animationDuration: contract.animation.duration.slower,
  animationTimingFunction: contract.animation.timing.linear,
  animationIterationCount: 'infinite',
});
