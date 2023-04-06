import type { FC, FieldsetHTMLAttributes } from 'react';

export type FieldsetProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'disabled'
> & {
  /**
   * Should the fieldset be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
};

/**
 * Fieldset component.
 */
export const Fieldset: FC<FieldsetProps> = ({
  children,
  isDisabled = false,
  ...props
}) => (
  <fieldset {...props} disabled={isDisabled}>
    {children}
  </fieldset>
);
