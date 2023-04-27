import {
  type ForwardRefRenderFunction,
  forwardRef,
  type AnchorHTMLAttributes,
} from 'react';
import type { ButtonOptions } from '../buttons';
import * as styles from '../buttons.css';

export type ButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  ButtonOptions & {
    /**
     * The button link target.
     */
    to: string;
  };

const ButtonLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonLinkProps
> = (
  {
    children,
    className = '',
    isDisabled = false,
    isLoading = false,
    kind = 'secondary',
    to,
    ...props
  },
  ref
) => {
  const buttonClassName = `${styles.button({
    kind,
    state: isDisabled ? 'disabled' : isLoading ? 'loading' : 'regular',
  })} ${className}`;

  return isDisabled || isLoading ? (
    <span {...props} className={buttonClassName}>
      {children}
    </span>
  ) : (
    <a {...props} className={buttonClassName} ref={ref} href={to}>
      {children}
    </a>
  );
};

/**
 * ButtonLink component.
 */
export const ButtonLink = forwardRef(ButtonLinkWithRef);
