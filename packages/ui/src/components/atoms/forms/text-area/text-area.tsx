import {
  type ForwardedRef,
  forwardRef,
  type TextareaHTMLAttributes,
} from 'react';

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'disabled' | 'readOnly' | 'required'
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

const TextAreaWithRef = (
  {
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    ...props
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    disabled={isDisabled}
    readOnly={isReadOnly}
    ref={ref}
    required={isRequired}
  />
);

/**
 * TextArea component.
 */
export const TextArea = forwardRef(TextAreaWithRef);
