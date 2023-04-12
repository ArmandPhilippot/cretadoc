import { globalStyle, style } from '@vanilla-extract/css';
import { contract } from '../../../themes';

export const branding = style({
  display: 'flex',
  flexFlow: 'row wrap',
  placeItems: 'center',
  gap: contract.spacing.sm,
  width: 'fit-content',
});

export const logo = style({
  flex: '0 0 auto',
  maxHeight: '4rem',
  height: '100%',
  transitionDuration: contract.animation.duration.fast,
  transitionProperty: 'all',
  transitionTimingFunction: contract.animation.timing.linear,
  selectors: {
    [`${branding}:hover &`]: {
      opacity: 0.85,
    },
    [`${branding}:focus &`]: {
      opacity: 0.85,
    },
  },
});

globalStyle(`${logo} > img`, {
  maxHeight: 'inherit',
});

export const brand = style({
  fontSize: contract.font.size.lg,
  fontWeight: contract.font.weight.strong,
});
