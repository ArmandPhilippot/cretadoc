import type { ChangeEventHandler, FC, ReactNode } from 'react';
import {
  Label,
  type LabelProps,
  Radio,
  type RadioProps,
} from '../../../../atoms';
import * as styles from './switch-item.css';

export type SwitchItemProps = Omit<
  LabelProps,
  'children' | 'isRequired' | 'requiredSymbol'
> &
  Pick<RadioProps, 'isDisabled' | 'name'> & {
    /**
     * The item id.
     */
    id: string;
    /**
     * Is the item selected?
     */
    isSelected?: boolean;
    /**
     * The label used to describe the switch item.
     */
    label: ReactNode;
    /**
     * The event handler on value change.
     */
    onSwitch: ChangeEventHandler<HTMLInputElement>;
    /**
     * The item value.
     */
    value: string;
  };

/**
 * SwitchItem component.
 */
export const SwitchItem: FC<SwitchItemProps> = ({
  className = '',
  id,
  isDisabled = false,
  isSelected = false,
  label,
  name,
  onSwitch,
  value,
  ...props
}) => {
  const itemClassName = styles.item({ isDisabled, isSelected });

  return (
    <Label {...props} className={`${itemClassName} ${className}`} htmlFor={id}>
      <Radio
        className={styles.radio}
        id={id}
        isChecked={isSelected}
        isDisabled={isDisabled}
        name={name}
        onChange={onSwitch}
        value={value}
      />
      <span className={styles.label}>{label}</span>
    </Label>
  );
};
