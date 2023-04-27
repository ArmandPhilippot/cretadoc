import {
  type ButtonHTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import type { ButtonOptions } from '../buttons';
import * as styles from '../buttons.css';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> &
  ButtonOptions;

const ButtonWithRef: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (
  {
    children,
    className = '',
    isDisabled = false,
    isLoading = false,
    kind = 'secondary',
    type = 'button',
    ...props
  },
  ref
) => {
  const buttonClassName = `${styles.button({
    kind,
    state: isDisabled ? 'disabled' : isLoading ? 'loading' : 'regular',
  })} ${className}`;

  return (
    <button
      {...props}
      className={buttonClassName}
      disabled={isDisabled || isLoading}
      ref={ref}
      // eslint-disable-next-line react/button-has-type -- Default value is set.
      type={type}
    >
      {children}
    </button>
  );
};

/**
 * Button component.
 */
export const Button = forwardRef(ButtonWithRef);
