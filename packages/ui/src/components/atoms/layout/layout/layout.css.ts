import { style } from '@vanilla-extract/css';
import { contract } from '../../../../themes';

export const layout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  minHeight: '100vh',
  background: contract.color.background.regular.base,
  color: contract.color.foreground.regular.base,
  fontFamily: contract.font.family.regular,
  fontSize: contract.font.size.md,
  lineHeight: contract.font.lineHeight.md,
  transitionDuration: contract.animation.duration.fast,
  transitionProperty: 'all',
  transitionTimingFunction: contract.animation.timing.easeInOut,
});
