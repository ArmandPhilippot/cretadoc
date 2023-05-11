import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { contract } from '../../../themes';

export const card = recipe({
  base: {
    borderColor: contract.color.borders.regular.light,
    borderRadius: contract.border.radius.soft,
    borderStyle: contract.border.style.regular,
    borderWidth: contract.border.size.sm,
    boxShadow: contract.shadow.regular.bottom.center.raised,
  },
});

export const cover = style({
  maxHeight: 150,
});

globalStyle(`${cover} > img`, {
  width: '100%',
  maxHeight: 'inherit',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const header = style({});

globalStyle(
  `${header} > h1, ${header} > h2, ${header} > h3, ${header} > h4, ${header} > h5, ${header} > h6`,
  {
    margin: contract.spacing.md,
    fontSize: contract.font.size.xl,
  }
);

export const excerpt = style({
  margin: contract.spacing.md,
});

export const footer = style({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: contract.spacing.sm,
  margin: contract.spacing.md,
  fontWeight: contract.font.weight.strong,
});
