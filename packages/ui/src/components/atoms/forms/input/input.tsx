import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from 'react';

export type DateFieldType =
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week';

export type NumericFieldType = 'number';

export type TextFieldType =
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

export type InputType = DateFieldType | NumericFieldType | TextFieldType;

type AllowedInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'checked'
  | 'disabled'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'readonly'
  | 'required'
  | 'src'
  | 'type'
  | 'width'
>;

export type RangeFieldProps = Omit<
  AllowedInputProps,
  'dirname' | 'maxLength' | 'minLength' | 'multiple' | 'pattern'
>;

export type DateFieldProps = Omit<RangeFieldProps, 'placeholder'>;

export type NumericFieldProps = RangeFieldProps;

export type TextFieldProps = Omit<AllowedInputProps, 'max' | 'min' | 'step'>;

type ResolveFieldProps<T extends InputType> = T extends DateFieldType
  ? DateFieldProps
  : T extends NumericFieldType
  ? NumericFieldProps
  : T extends 'email'
  ? Omit<TextFieldProps, 'dirname'>
  : T extends 'tel' | 'url'
  ? Omit<TextFieldProps, 'dirname' | 'multiple'>
  : T extends 'password'
  ? Omit<TextFieldProps, 'dirname' | 'list' | 'multiple'>
  : Omit<TextFieldProps, 'multiple'>;

export type InputProps<T extends InputType> = ResolveFieldProps<T> & {
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
  /**
   * The field type.
   */
  type: T;
};

const InputWithRef = <T extends InputType = 'text'>(
  {
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    type,
    ...props
  }: InputProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <input
    {...props}
    disabled={isDisabled}
    readOnly={isReadOnly}
    ref={ref}
    required={isRequired}
    type={type}
  />
);

/**
 * Input component.
 */
export const Input = forwardRef(InputWithRef);
