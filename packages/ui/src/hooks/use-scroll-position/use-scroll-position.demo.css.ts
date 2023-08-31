import { style } from '@vanilla-extract/css';
import { contract } from '../../themes';

export const boxWrapper = style({
  width: 200,
  height: 150,
  padding: contract.spacing.md,
  overflow: 'auto',
  borderColor: contract.color.borders.regular.base,
  borderStyle: contract.border.style.regular,
  borderWidth: contract.border.size.md,
  textAlign: 'center',
});

export const box = style({
  minHeight: '100vh',
  minWidth: '100vw',
  position: 'relative',
});

export const list = style({
  padding: 0,
  listStyleType: 'none',
});

export const stickyList = style({
  position: 'sticky',
  left: 0,
  top: '1rem',
});
