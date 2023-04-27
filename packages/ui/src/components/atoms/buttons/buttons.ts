export type ButtonKind = 'neutral' | 'primary' | 'secondary';

export type ButtonOptions = {
  /**
   * Should the button be disabled?
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Should the button indicate a loading state?
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * The button variant.
   *
   * @default 'secondary'
   */
  kind?: ButtonKind;
};
