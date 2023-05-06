import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, SVGAttributes } from 'react';
import { contract } from '../../../themes';
import type {
  AnimationDurationTokens,
  ColorContextTokens,
  IconSizeTokens,
} from '../../../themes/types/tokens';
import type { Position } from '../../types';
import { getColorFromTokenKey } from '../../utils/helpers';
import * as styles from './icon.css';
import {
  AngleSVGPaths,
  CrossSVGPaths,
  HamburgerSVGPaths,
  MoonSVGPaths,
  SearchSVGPaths,
  SunSVGPaths,
} from './svg-paths';

export type IconColor = keyof ColorContextTokens | 'primary';

export type IconOrientation = Exclude<Position, 'center'>;

export type IconSize = keyof IconSizeTokens;

export type IconShape =
  | 'angle'
  | 'cross'
  | 'hamburger'
  | 'moon'
  | 'search'
  | 'sun';

type IconPathsProps = {
  orientation?: IconOrientation;
  shape: IconShape;
};

const IconPaths: FC<IconPathsProps> = ({ orientation, shape }) => {
  switch (shape) {
    case 'angle':
      return <AngleSVGPaths orientation={orientation ?? 'bottom'} />;
    case 'cross':
      return <CrossSVGPaths />;
    case 'hamburger':
      return <HamburgerSVGPaths />;
    case 'moon':
      return <MoonSVGPaths />;
    case 'search':
      return <SearchSVGPaths />;
    case 'sun':
    default:
      return <SunSVGPaths />;
  }
};

export type IconProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'viewBox' | 'xmlns'
> & {
  /**
   * Control the animation or transition speed when the icon can be animated.
   */
  animationSpeed?: keyof AnimationDurationTokens;
  /**
   * Set the icon color.
   *
   * Use either the same color as the text or the theme primary color.
   *
   * @default 'foreground'
   */
  color?: IconColor;
  /**
   * Describe the icon.
   */
  description?: string;
  /**
   * The icon orientation. Only used with some shapes (like `angle`).
   */
  orientation?: IconOrientation;
  /**
   * The icon shape.
   */
  shape: IconShape;
  /**
   * Set the icon size.
   *
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Define a title for the icon.
   */
  title?: string;
};

/**
 * Icon component.
 */
export const Icon: FC<IconProps> = ({
  animationSpeed,
  className = '',
  color = 'regular',
  description,
  orientation,
  size = 'md',
  shape,
  style,
  title,
  ...props
}) => {
  const iconStyles = assignInlineVars({
    [styles.animationSpeed]: animationSpeed
      ? contract.animation.duration[animationSpeed]
      : '',
    [styles.iconColor]: getColorFromTokenKey(color, 'foreground'),
    [styles.iconSize]: contract.icon.size[size],
  });

  const iconClassName = styles.icon({
    shape: shape.startsWith('angle') ? 'angle' : shape,
  });

  return (
    <svg
      {...props}
      className={`${iconClassName} ${className}`}
      style={{ ...iconStyles, ...(style ?? {}) }}
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title !== undefined && <title>{title}</title>}
      {description !== undefined && <desc>{description}</desc>}
      <IconPaths orientation={orientation} shape={shape} />
    </svg>
  );
};
