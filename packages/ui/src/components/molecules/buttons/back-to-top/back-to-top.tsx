import type { FC } from 'react';
import {
  ButtonLink,
  type ButtonLinkProps,
  Icon,
  VisuallyHidden,
} from '../../../atoms';
import * as styles from './back-to-top.css';

export type BackToTopProps = Omit<ButtonLinkProps, 'children' | 'to'> & {
  /**
   * Should the label be visible?
   *
   * @default false
   */
  isLabelVisible?: boolean;
  /**
   * Should the button be visible?
   *
   * @default true
   */
  isVisible?: boolean;
  /**
   * The button label.
   *
   * @default 'Back to top'
   */
  label?: string;
  /**
   * The id of the top element in the page.
   */
  targetId: string;
};

/**
 * BackToTop component.
 */
export const BackToTop: FC<BackToTopProps> = ({
  className = '',
  isLabelVisible = false,
  isVisible = true,
  label = 'Back to top',
  targetId,
}) => {
  const buttonClassName = styles.button({ isVisible });

  return (
    <ButtonLink
      className={`${buttonClassName} ${className}`}
      to={`#${targetId}`}
    >
      {isLabelVisible ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <VisuallyHidden>{label}</VisuallyHidden>
      )}
      <Icon
        aria-hidden="true"
        className={styles.icon}
        color="primary"
        orientation="top"
        shape="angle"
        size={isLabelVisible ? 'xs' : 'sm'}
      />
    </ButtonLink>
  );
};
