import type { FC } from 'react';
import {
  Fieldset,
  type FieldsetProps,
  Radio,
  Legend,
  type RadioProps,
} from '../../../atoms';
import { LabelledField } from '../labelled-field';
import * as styles from './radio-group.css';

export type RadioGroupItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * Should the item be disabled?
   */
  isDisabled?: boolean;
  /**
   * The item label.
   */
  label: string;
  /**
   * The item value.
   */
  value: string;
};

export type RadioGroupProps = Omit<
  FieldsetProps,
  'children' | 'onChange' | 'role'
> & {
  /**
   * Should we display the radio buttons inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * The radio group options.
   */
  items: RadioGroupItem[];
  /**
   * A legend to describe the purpose of the radio buttons.
   */
  legend: string;
  /**
   * The radio group name.
   */
  name: string;
  /**
   * A function to handle selection change.
   */
  onChange?: RadioProps['onChange'];
  /**
   * The selected value. It should match a RadioGroupItem value or be undefined.
   */
  value?: RadioGroupItem['value'];
};

/**
 * RadioGroup component.
 */
export const RadioGroup: FC<RadioGroupProps> = ({
  className = '',
  isDisabled = false,
  isInline = false,
  items,
  legend,
  name,
  onChange,
  value,
  ...props
}) => {
  const radioGroupClassName = styles.group({ isInline });

  return (
    <Fieldset
      {...props}
      className={`${radioGroupClassName} ${className}`}
      isDisabled={isDisabled}
      role="radiogroup"
    >
      <Legend
        className={styles.legend}
        color={isDisabled ? 'muted' : 'regular'}
      >
        {legend}
      </Legend>
      {items.map((item) => (
        <LabelledField
          color={isDisabled || item.isDisabled ? 'muted' : 'regular'}
          field={
            <Radio
              {...item}
              isChecked={value === item.value}
              name={name}
              onChange={onChange}
            />
          }
          isReversedOrder
          key={item.id}
          label={item.label}
          layout="row"
        />
      ))}
    </Fieldset>
  );
};
