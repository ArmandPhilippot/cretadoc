import type { FC, ReactNode } from 'react';
import { useVisuallyHidden } from '../../../../hooks';
import { ButtonLink, type ButtonLinkProps } from '../../../atoms';
import * as styles from './skip-to.css';

export type SkipToProps = Omit<ButtonLinkProps, 'children' | 'to'> & {
  /**
   * The button label.
   */
  label: ReactNode;
  /**
   * The id of the target.
   */
  targetId: string;
};

/**
 * Skip to component.
 */
export const SkipTo: FC<SkipToProps> = ({
  className = '',
  label,
  targetId,
  ...props
}) => {
  const visuallyHidden = useVisuallyHidden(true);

  return (
    <ButtonLink
      {...props}
      className={`${visuallyHidden} ${styles.btn} ${className}`}
      to={`#${targetId}`}
    >
      {label}
    </ButtonLink>
  );
};
