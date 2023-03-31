import { Children, type FC, type ReactNode } from 'react';
import * as styles from './preview-list.css';

type PreviewListProps = {
  /**
   * The children.
   */
  children: ReactNode[];
  /**
   * Create a new line after the given number of elements.
   */
  itemsPerRow?: number;
};

export const PreviewList: FC<PreviewListProps> = ({
  children,
  itemsPerRow,
}) => {
  const isLineBreakRequired = (currentElCount: number, totalItems: number) => {
    if (!itemsPerRow || currentElCount === totalItems) return false;

    return currentElCount % itemsPerRow === 0;
  };

  return (
    <div className={styles.wrapper}>
      {Children.map(children, (child, index) => (
        <>
          {child}
          {isLineBreakRequired(index + 1, children.length) ? (
            <hr className={styles.lineBreak} />
          ) : null}
        </>
      ))}
    </div>
  );
};
