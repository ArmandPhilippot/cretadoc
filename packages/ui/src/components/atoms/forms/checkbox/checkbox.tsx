import type { FC } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';

export type CheckboxProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Checkbox component.
 */
export const Checkbox: FC<CheckboxProps> = ({ ...props }) => (
  <BooleanField {...props} type="checkbox" />
);
