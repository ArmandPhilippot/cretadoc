import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';
import * as styles from '../fields.css';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'readonly' | 'required'
> & {
  /**
   * Should the field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the field be readonly?
   *
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * Should the field be required?
   *
   * @default false
   */
  isRequired?: boolean;
};

const InputWithRef = (
  {
    className = '',
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const fieldClassName = styles.field({ isSelect: false, isTextArea: false });

  return (
    <input
      {...props}
      className={`${fieldClassName} ${className}`}
      disabled={isDisabled}
      readOnly={isReadOnly}
      ref={ref}
      required={isRequired}
    />
  );
};

/**
 * Input component.
 */
export const Input = forwardRef(InputWithRef);
