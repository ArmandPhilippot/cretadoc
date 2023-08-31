import { type FC, useRef } from 'react';
import { Preview, PreviewList } from '../../utils/stories';
import { useScrollPosition } from './use-scroll-position';
import * as styles from './use-scroll-position.demo.css';

export const UseScrollPositionDemo: FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const { x: windowX, y: windowY } = useScrollPosition();
  const { x: divX, y: divY } = useScrollPosition(divRef);

  return (
    <PreviewList hasSpaceBetween>
      <Preview title="Window scroll position" style={{ minHeight: '100vh' }}>
        <ul className={styles.list}>
          <li aria-label="Window position X">x: {windowX}</li>
          <li aria-label="Window position Y">y: {windowY}</li>
        </ul>
        <p>If you do not see the body scrollbar, please resize your window.</p>
      </Preview>
      <Preview title="Div scroll position">
        <div className={styles.boxWrapper} ref={divRef}>
          <ul className={`${styles.list} ${styles.stickyList}`}>
            <li aria-label="Div position X">x: {divX}</li>
            <li aria-label="Div position Y">y: {divY}</li>
          </ul>
          <div
            className={styles.box}
            // cspell:ignore-word noninteractive
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
          />
        </div>
      </Preview>
    </PreviewList>
  );
};
