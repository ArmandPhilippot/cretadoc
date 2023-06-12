import { type ImageProps, Img } from '@cretadoc/ui';

export type MarkdownImageProps = Partial<Pick<ImageProps, 'alt' | 'src'>> & {
  [x: string]: unknown;
};

export const MarkdownImage = ({
  alt,
  node,
  src,
  ...props
}: MarkdownImageProps) => <Img {...props} alt={alt ?? ''} src={src ?? ''} />;
