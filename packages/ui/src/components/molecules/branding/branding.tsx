import type { FC, ReactElement } from 'react';
import { Link, type ImageProps, type LinkProps } from '../../atoms';
import * as styles from './branding.css';

export type BrandingProps = LinkProps & {
  /**
   * The brand name.
   */
  brand: string;
  /**
   * The brand logo.
   */
  logo?: ReactElement<ImageProps>;
};

/**
 * Branding component.
 */
export const Branding: FC<BrandingProps> = ({
  brand,
  className = '',
  logo,
  ...props
}) => (
  <Link {...props} className={`${styles.branding} ${className}`}>
    {logo ? <div className={styles.logo}>{logo}</div> : null}
    <div className={styles.brand}>{brand}</div>
  </Link>
);
