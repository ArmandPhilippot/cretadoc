import { createVar, keyframes, style } from '@vanilla-extract/css';
import { contract } from '../../contract';

export const animationName = createVar();
export const duration = createVar();
export const playState = createVar();
export const timing = createVar();

export const preview = style({});

export const form = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, auto)',
  gap: '1rem',
  paddingBlock: '1rem',
});

export const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const slideIn = keyframes({
  '0%': { marginLeft: '-10%' },
  '100%': { marginLeft: '100%' },
});

export const boxWrapper = style({
  minWidth: 200,
});

export const animatedBox = style({
  width: 50,
  height: 50,
  margin: '1rem',
  background: contract.color.primary.base,
  animationDuration: duration,
  animationIterationCount: 'infinite',
  animationName,
  animationPlayState: playState,
  animationTimingFunction: timing,
});

export const transitionedBox = style({
  display: 'flex',
  placeItems: 'center',
  justifyContent: 'center',
  height: 50,
  marginRight: 0,
  background: contract.color.primary.base,
  color: contract.color.foreground.onPrimary.base,
  transitionDuration: duration,
  transitionProperty: 'margin-right',
  transitionTimingFunction: timing,
  selectors: {
    [`${boxWrapper}:hover &`]: {
      marginRight: -150,
    },
  },
});
