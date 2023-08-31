import type { FC, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import * as styles from '../fields.css';

type SelectItemProps = OptionHTMLAttributes<HTMLOptionElement> & {
  /**
   * The option label.
   */
  label: string;
  /**
   * The option value.
   */
  value: string;
};

/**
 * SelectItem component.
 */
const SelectItem: FC<SelectItemProps> = ({ label, ...props }) => (
  <option {...props}>{label}</option>
);

export type SelectAriaRole = 'combobox' | 'listbox' | 'menu';

export type SelectOption = Pick<SelectItemProps, 'label' | 'value'> & {
  /**
   * Should the option be disabled?
   */
  isDisabled?: boolean;
};

export type SelectProps<M extends boolean> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'disabled' | 'required' | 'value'
> & {
  /**
   * Should the select field be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Is the select field required?
   *
   * @default false
   */
  isRequired?: boolean;
  /**
   * Allow multiple options to be selected in the list.
   *
   * @default false
   */
  multiple?: M;
  /**
   * The select options.
   */
  options: SelectOption[];
  /**
   * The placeholder label if you want to display a default option.
   */
  placeholder?: string;
  /**
   * An accessible role.
   */
  role?: SelectAriaRole;
  /**
   * The selected value.
   */
  value: M extends true ? string[] : string;
};

/**
 * Select component.
 */
export const Select = <M extends boolean = false>({
  className = '',
  defaultValue,
  isDisabled = false,
  isRequired = false,
  multiple,
  options,
  placeholder,
  value,
  ...props
}: SelectProps<M>) => {
  const selectClassName = styles.field({ isTextArea: false });
  const firstOption: SelectOption = {
    label: placeholder ?? '',
    value: '',
    isDisabled: true,
  };
  const placeholderDefaultValue = multiple
    ? [firstOption.value]
    : firstOption.value;
  const allOptions: SelectOption[] = placeholder
    ? [firstOption, ...options]
    : options;

  return (
    <select
      {...props}
      className={`${selectClassName} ${className}`}
      defaultValue={placeholder ? placeholderDefaultValue : defaultValue}
      disabled={isDisabled}
      multiple={multiple}
      required={isRequired}
    >
      {allOptions.map((option) => (
        <SelectItem
          key={option.value}
          disabled={option.isDisabled}
          label={option.label}
          value={option.value}
        />
      ))}
    </select>
  );
};
