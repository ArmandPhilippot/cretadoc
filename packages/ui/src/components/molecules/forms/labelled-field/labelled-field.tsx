import type { FC, ReactElement } from 'react';
import {
  type CheckboxProps,
  Label,
  type LabelProps,
  type RadioProps,
  type SelectProps,
  type InputProps,
  type TextAreaProps,
} from '../../../atoms';
import * as styles from './labelled-field.css';

export type LabelledFieldProps = Omit<LabelProps, 'children' | 'htmlFor'> & {
  /**
   * The field.
   */
  field: ReactElement<
    | CheckboxProps
    | InputProps
    | RadioProps
    | SelectProps<boolean>
    | TextAreaProps
  >;
  /**
   * If true, the label is displayed after the field.
   */
  isReversedOrder?: boolean;
  /**
   * The label.
   */
  label: LabelProps['children'];
  /**
   * Control the position of the label.
   */
  layout?: 'column' | 'row';
};

/**
 * LabelledField component.
 */
export const LabelledField: FC<LabelledFieldProps> = ({
  field,
  isReversedOrder = false,
  label,
  layout = 'column',
  ...props
}) => {
  const wrapperClassName = styles.wrapper({ isReversedOrder, layout });

  return (
    <div className={wrapperClassName}>
      <Label {...props} htmlFor={field.props.id}>
        {label}
      </Label>
      {field}
    </div>
  );
};
