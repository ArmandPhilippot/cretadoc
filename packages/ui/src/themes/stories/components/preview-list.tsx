import { Children, type FC, type ReactNode } from 'react';
import * as styles from './preview-list.css';

type PreviewListProps = {
  /**
   * The children.
   */
  children: ReactNode[];
  /**
   * Wrap after the given number of elements.
   */
  wrapAfter?: number;
};

export const PreviewList: FC<PreviewListProps> = ({ children, wrapAfter }) => {
  const isLineBreakRequired = (currentElCount: number) => {
    if (!wrapAfter) return false;

    return currentElCount % wrapAfter === 0;
  };

  return (
    <div className={styles.wrapper}>
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
