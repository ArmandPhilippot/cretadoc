import {
  createElement,
  type FC,
  type HTMLAttributes,
  type ReactHTML,
} from 'react';
import * as styles from './heading.css';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * Should we simulate a heading?
   *
   * @default false
   */
  isFake?: boolean;
  /**
   * The heading level: a number between 1 and 6.
   */
  level: HeadingLevel;
};

type HeadingElement = {
  className: string;
};

/**
 * Heading component
 */
export const Heading: FC<HeadingProps> = ({
  children,
  className = '',
  isFake,
  level,
  ...props
}) => {
  const headingTag = `h${level}` as keyof ReactHTML;
  const tagStyles = styles.heading({ level: `${level}` });
  const headingClassName = `${tagStyles} ${className}`;

  return isFake ? (
    <p {...props} className={headingClassName}>
      {children}
    </p>
  ) : (
    createElement<HeadingElement, HTMLHeadingElement>(
      headingTag,
      { ...props, className: headingClassName },
      children
    )
  );
};
