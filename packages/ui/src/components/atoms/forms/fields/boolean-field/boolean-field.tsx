import type { FC, InputHTMLAttributes } from 'react';

export type BooleanFieldType = 'checkbox' | 'radio';

type DefaultProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'autoComplete'
  | 'capture'
  | 'checked'
  | 'disabled'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'list'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'src'
  | 'step'
  | 'width'
>;

export type BooleanFieldProps = DefaultProps & {
  /**
   * The field id.
   */
  id: string;
  /**
   * Should the field be checked?
   *
   * @default false
   */
  isChecked?: boolean;
  /**
   * Should the field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the field be required?
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * The field name.
   */
  name: string;
  /**
   * The field type.
   */
  type: BooleanFieldType;
};

/**
 * BooleanField component.
 */
export const BooleanField: FC<BooleanFieldProps> = ({
  isChecked = false,
  isDisabled = false,
  isRequired = false,
  ...props
}) => (
  <input
    {...props}
    checked={isChecked}
    disabled={isDisabled}
    required={isRequired}
  />
);
