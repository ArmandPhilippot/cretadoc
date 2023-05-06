import type { ChangeEventHandler, FC, ReactNode } from 'react';
import {
  Checkbox,
  type CheckboxProps,
  Label,
  type LabelProps,
} from '../../../../atoms';
import * as styles from './toggle-item.css';

export type ToggleItemProps = Omit<
  LabelProps,
  'children' | 'isRequired' | 'requiredSymbol'
> &
  Pick<
    CheckboxProps,
    'id' | 'isChecked' | 'isDisabled' | 'name' | 'onChange'
  > & {
    /**
     * The label used to describe the toggle item.
     */
    label: ReactNode;
    onToggle: ChangeEventHandler<HTMLInputElement>;
  };

/**
 * ToggleItem component.
 */
export const ToggleItem: FC<ToggleItemProps> = ({
  id,
  isChecked = false,
  isDisabled = false,
  label,
  name,
  onToggle,
  ...props
}) => {
  const itemClassName = styles.item({ isChecked, isDisabled });

  return (
    <Label {...props} htmlFor={id}>
      <Checkbox
        className={styles.checkbox}
        id={id}
        isChecked={isChecked}
        isDisabled={isDisabled}
        name={name}
        onChange={onToggle}
      />
      <span className={itemClassName}>{label}</span>
    </Label>
  );
};
