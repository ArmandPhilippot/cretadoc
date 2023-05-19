import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../../themes';

export const button = recipe({
  base: {
    position: 'fixed',
    bottom: contract.spacing.md,
    right: contract.spacing.md,
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        transitionDuration: contract.animation.duration.medium,
        transitionProperty: 'all',
        transitionTimingFunction: contract.animation.timing.easeIn,
      },
    },
  },
  variants: {
    isVisible: {
      false: {
        opacity: 0,
        transform: `translateX(${contract.spacing.md}) translateY(${contract.spacing.md})`,
        visibility: 'hidden',
      },
      true: {
        opacity: 1,
        visibility: 'visible',
        boxShadow: contract.shadow.regular.bottom.right.floating,
      },
    },
  },
});

export const label = style({
  fontSize: contract.font.size.sm,
});

const pulseAnimation = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(0.8)' },
  '100%': { transform: 'scale(1)' },
});

const animatedIcon = {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animationDuration: contract.animation.duration.slower,
      animationIterationCount: 'infinite',
      animationName: pulseAnimation,
      animationTimingFunction: contract.animation.timing.easeInOut,
    },
  },
};

export const icon = style({
  selectors: {
    [`${button({})}:hover &`]: animatedIcon,
    [`${button({})}:focus &`]: animatedIcon,
    [`${button({})}:active &`]: {
      animationPlayState: 'paused',
    },
  },
});
