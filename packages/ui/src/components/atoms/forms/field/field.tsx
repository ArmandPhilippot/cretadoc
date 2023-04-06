import { type ForwardedRef, forwardRef } from 'react';
import { Input, type InputProps, type InputType } from '../input';
import { TextArea, type TextAreaProps } from '../text-area';
import * as styles from './field.css';

type FieldType = InputType | 'textarea';

type FieldProps<T extends FieldType> = T extends InputType
  ? InputProps<T>
  : TextAreaProps & { type: 'textarea' };

type ResolveElementType<T extends FieldType> = T extends InputType
  ? HTMLInputElement
  : HTMLTextAreaElement;

const isTextAreaProps = (
  props: InputProps<InputType> | (TextAreaProps & { type: 'textarea' })
): props is TextAreaProps & { type: 'textarea' } => props.type === 'textarea';

const FieldWithRef = <T extends FieldType>(
  props: FieldProps<T>,
  ref: ForwardedRef<ResolveElementType<T>>
) => {
  const { className = '', type } = props;
  const fieldClassName = styles.field({ isTextArea: type === 'textarea' });

  if (isTextAreaProps(props))
    return (
      <TextArea
        {...props}
        className={`${fieldClassName} ${className}`}
        ref={ref as ForwardedRef<HTMLTextAreaElement>}
      />
    );

  return (
    <Input
      {...props}
      className={`${fieldClassName} ${className}`}
      ref={ref as ForwardedRef<HTMLInputElement>}
    />
  );
};

/**
 * Field component.
 */
export const Field = forwardRef(FieldWithRef);
