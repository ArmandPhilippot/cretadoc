import type { FC, ReactElement } from 'react';
import {
  Form,
  type FormProps,
  type InputProps,
  type ButtonProps,
} from '../../../atoms';
import { LabelledField } from '../../../molecules';
import * as styles from './search-form.css';

export type SearchFormProps = Omit<FormProps, 'children'> & {
  /**
   * The submit button.
   */
  button: ReactElement<ButtonProps>;
  /**
   * Define the button position.
   *
   * @default "stretch"
   */
  buttonPosition?: styles.FormVariants['buttonPosition'];
  /**
   * The search field.
   */
  field: ReactElement<InputProps>;
  /**
   * Should we add a spacing between the button and the labelled field?
   *
   * @default true
   */
  hasSpacing?: boolean;
  /**
   * Should the label be bidden visually?
   *
   * @default false
   */
  isLabelHidden?: boolean;
  /**
   * The label text content.
   */
  label: string;
  /**
   * Control the search form layout.
   *
   * @default "column"
   */
  layout?: styles.FormVariants['layout'];
};

/**
 * SearchForm component.
 */
export const SearchForm: FC<SearchFormProps> = ({
  button,
  buttonPosition = 'stretch',
  className = '',
  field,
  hasSpacing = true,
  isLabelHidden = false,
  label,
  layout = 'column',
  ...props
}) => {
  const formClassName = styles.form({
    buttonPosition,
    hasSpacing,
    layout,
  });

  return (
    <Form {...props} className={`${formClassName} ${className}`}>
      <LabelledField
        field={field}
        isLabelHidden={isLabelHidden}
        label={label}
        layout={layout}
      />
      {button}
    </Form>
  );
};
