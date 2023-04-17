import type { FC, ReactElement } from 'react';
import {
  type CheckboxProps,
  Label,
  type LabelProps,
  type RadioProps,
  type SelectProps,
  type InputProps,
  type TextAreaProps,
  VisuallyHidden,
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
   * Should the label be visually hidden?
   *
   * @default false
   */
  isLabelHidden?: boolean;
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
  isLabelHidden = false,
  isReversedOrder = false,
  label,
  layout = 'column',
  ...props
}) => {
  const wrapperClassName = styles.wrapper({
    isLabelHidden,
    isReversedOrder,
    layout,
  });

  return (
    <div className={wrapperClassName}>
      <Label {...props} htmlFor={field.props.id}>
        {isLabelHidden ? <VisuallyHidden>{label}</VisuallyHidden> : label}
      </Label>
      {field}
    </div>
  );
};
