import { Input, type InputProps } from '@cretadoc/ui';

export type MarkdownFieldProps = Partial<
  Pick<InputProps, 'id' | 'name' | 'type'>
> & {
  [x: string]: unknown;
};

export const MarkdownField = ({
  id,
  name,
  node,
  type,
  ...props
}: MarkdownFieldProps) => (
  <Input {...props} id={id ?? ''} name={name ?? ''} type={type ?? 'text'} />
);
