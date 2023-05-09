import type { FC, ChangeEventHandler, ReactNode } from 'react';
import { Fieldset, type FieldsetProps, Legend } from '../../../atoms';
import {
  SwitchItem as SwitchItemComponent,
  type SwitchItemProps,
} from './switch-item';
import * as styles from './switch.css';

export type SwitchItem = Omit<
  SwitchItemProps,
  'isChecked' | 'name' | 'onSwitch'
>;

export type SwitchProps = Omit<FieldsetProps, 'children'> & {
  /**
   * Should the switch be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The switch items.
   */
  items: [SwitchItem, SwitchItem];
  /**
   * The switch legend.
   */
  legend?: ReactNode;
  /**
   * The switch group name.
   */
  name: string;
  /**
   * A function to handle selection change.
   */
  onSwitch: ChangeEventHandler<HTMLInputElement>;
  /**
   * The selected item value.
   */
  value: SwitchItem['value'];
};

/**
 * Switch component.
 */
export const Switch: FC<SwitchProps> = ({
  className = '',
  isDisabled = false,
  items,
  legend,
  name,
  onSwitch,
  value,
  ...props
}) => {
  const groupClassName = styles.group({ isDisabled });

  return (
    <Fieldset {...props} className={`${styles.fieldset} ${className}`}>
      {legend ? <Legend className={styles.legend}>{legend}</Legend> : null}
      <div className={groupClassName}>
        {items.map((item) => (
          <SwitchItemComponent
            {...item}
            isDisabled={isDisabled}
            isSelected={value === item.value}
            key={item.id}
            name={name}
            onSwitch={onSwitch}
          />
        ))}
      </div>
    </Fieldset>
  );
};
