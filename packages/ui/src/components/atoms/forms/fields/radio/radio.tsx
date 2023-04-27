import type { FC } from 'react';
import { BooleanField, type BooleanFieldProps } from '../boolean-field';
import * as styles from './radio.css';

export type RadioProps = Omit<BooleanFieldProps, 'type'>;

/**
 * Radio component.
 */
export const Radio: FC<RadioProps> = ({ className = '', ...props }) => (
  <BooleanField
    {...props}
    className={`${styles.radio} ${className}`}
    type="radio"
  />
);
