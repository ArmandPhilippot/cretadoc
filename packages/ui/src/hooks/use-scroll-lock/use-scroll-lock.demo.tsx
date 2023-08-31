import { type FC, useCallback, useState, useRef } from 'react';
import { Checkbox, LabelledField } from '../../components';
import { Preview, PreviewList } from '../../utils/stories';
import { useScrollLock } from './use-scroll-lock';
import * as styles from './use-scroll-lock.demo.css';

export const UseScrollLockDemo: FC = () => {
  const [isBodyScrollLocked, setIsBodyScrollLocked] = useState(false);
  const [isDivScrollLocked, setIsDivScrollLocked] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleBodyScrollChange = useCallback(() => {
    setIsBodyScrollLocked((prevState) => !prevState);
  }, []);

  const handleDivScrollChange = useCallback(() => {
    setIsDivScrollLocked((prevState) => !prevState);
  }, []);

  useScrollLock(isBodyScrollLocked);
  useScrollLock(isDivScrollLocked, divRef);

  return (
    <PreviewList hasSpaceBetween>
      <Preview style={{ minHeight: '100vh' }}>
        <p>If you do not see the body scrollbar, please resize your window.</p>
        <LabelledField
          field={
            <Checkbox
              id="lock-body-scroll"
              isChecked={isBodyScrollLocked}
              name="lock-body-scroll"
              onChange={handleBodyScrollChange}
            />
          }
          isReversedOrder
          label="Lock body scroll"
          layout="row"
        />
      </Preview>
      <Preview>
        <LabelledField
          field={
            <Checkbox
              id="lock-div-scroll"
              isChecked={isDivScrollLocked}
              name="lock-div-scroll"
              onChange={handleDivScrollChange}
            />
          }
          isReversedOrder
          label="Lock div scroll"
          layout="row"
        />
        <div className={styles.boxWrapper} id="locked-div" ref={divRef}>
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
