import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, SVGAttributes } from 'react';
import { contract } from '../../../themes';
import type {
  ColorContextTokens,
  IconSizeTokens,
} from '../../../themes/types/tokens';
import { getColorFromTokenKey } from '../../utils/helpers';
import * as styles from './icon.css';
import { CrossSVGPaths, HamburgerSVGPaths } from './svg-paths';

export type IconColor = keyof ColorContextTokens | 'primary';

export type IconSize = keyof IconSizeTokens;

export type IconShape = 'cross' | 'hamburger';

type IconPathsProps = {
  shape: IconShape;
};

const IconPaths: FC<IconPathsProps> = ({ shape }) => {
  switch (shape) {
    case 'cross':
      return <CrossSVGPaths />;
    case 'hamburger':
    default:
      return <HamburgerSVGPaths />;
  }
};

export type IconProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'children' | 'viewBox' | 'xmlns'
> & {
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
  className = '',
  color = 'regular',
  description,
  direction,
  size = 'md',
  shape,
  style,
  title,
  ...props
}) => {
  const iconStyles = assignInlineVars({
    [styles.iconColor]: getColorFromTokenKey(color),
    [styles.iconSize]: contract.icon.size[size],
  });

  const iconClassName = styles.icon({ shape });

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
      <IconPaths shape={shape} />
    </svg>
  );
};
