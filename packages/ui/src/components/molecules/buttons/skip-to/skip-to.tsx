import type { FC, ReactNode } from 'react';
import {
  ButtonLink,
  VisuallyHidden,
  type ButtonLinkProps,
} from '../../../atoms';
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
  const buttonClassName = styles.btn;

  return (
    <VisuallyHidden isFocusable>
      <ButtonLink
        {...props}
        className={`${buttonClassName} ${className}`}
        to={`#${targetId}`}
      >
        {label}
      </ButtonLink>
    </VisuallyHidden>
  );
};
