import type { ChangeEventHandler, FC, ReactNode } from 'react';
import {
  Checkbox,
  type CheckboxProps,
  Label,
  type LabelProps,
  VisuallyHidden,
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
  className = '',
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
    <Label {...props} className={`${itemClassName} ${className}`} htmlFor={id}>
      <VisuallyHidden>
        <Checkbox
          id={id}
          isChecked={isChecked}
          isDisabled={isDisabled}
          name={name}
          onChange={onToggle}
        />
      </VisuallyHidden>
      {label}
    </Label>
  );
};
