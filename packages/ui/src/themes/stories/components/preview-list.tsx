import { Children, type FC, type ReactNode } from 'react';
import * as styles from './preview-list.css';

type PreviewListProps = {
  /**
   * The children.
   */
  children: ReactNode[];
  /**
   * Should the preview list be bordered?
   *
   * @default false
   */
  isBordered?: boolean;
  /**
   * Wrap after the given number of elements.
   */
  wrapAfter?: number;
};

export const PreviewList: FC<PreviewListProps> = ({
  children,
  isBordered = false,
  wrapAfter,
}) => {
  const wrapperClassName = styles.wrapper({ isBordered });

  const isLineBreakRequired = (currentElCount: number) => {
    if (!wrapAfter) return false;

    return currentElCount % wrapAfter === 0;
  };

  return (
    <div className={wrapperClassName}>
      {Children.map(children, (child, index) => (
        <>
          {child}
          {isLineBreakRequired(index + 1) ? (
            <hr className={styles.lineBreak} />
          ) : null}
        </>
      ))}
    </div>
  );
};
