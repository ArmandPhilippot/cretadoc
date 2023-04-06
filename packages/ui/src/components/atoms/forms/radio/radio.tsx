import type { FC } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';

export type RadioProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Radio component.
 */
export const Radio: FC<RadioProps> = ({ ...props }) => (
  <BooleanField {...props} type="radio" />
);
