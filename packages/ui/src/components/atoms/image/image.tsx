import type { FC, ImgHTMLAttributes } from 'react';
import * as styles from './image.css';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /**
   * A description of the image. Use an empty string if it is not needed.
   */
  alt: string;
  /**
   * The image source.
   */
  src: string;
};

/**
 * Image component.
 */
export const Img: FC<ImageProps> = ({
  alt,
  className = '',
  decoding = 'async',
  loading = 'lazy',
  src,
  ...props
}) => {
  const imageClassName = `${styles.image} ${className}`;

  return (
    <img
      {...props}
      alt={alt}
      className={imageClassName}
      decoding={decoding}
      loading={loading}
      src={src}
    />
  );
};
