import type { FC, ReactElement } from 'react';
import { Fieldset, type FieldsetProps } from '../../../../atoms';
import type { ToggleItemProps } from '../toggle-item';
import * as styles from './toggle-group.css';

export type ToggleGroupProps = Omit<FieldsetProps, 'children'> & {
  children: Array<ReactElement<ToggleItemProps>>;
};

/**
 * ToggleGroup component.
 */
export const ToggleGroup: FC<ToggleGroupProps> = ({
  children,
  className = '',
  ...props
}) => (
  <Fieldset {...props} className={`${styles.group} ${className}`}>
    {children}
  </Fieldset>
);
