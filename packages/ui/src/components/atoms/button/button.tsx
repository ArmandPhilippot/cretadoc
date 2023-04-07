import {
  type ButtonHTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import * as styles from './button.css';

export type ButtonKind = 'neutral' | 'primary' | 'secondary';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  /**
   * Should the button be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the button indicate a loading state?
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The button variant.
   *
   * @default 'secondary'
   */
  kind?: ButtonKind;
};

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
