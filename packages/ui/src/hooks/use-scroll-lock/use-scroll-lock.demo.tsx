import { type FC, useCallback, useState, useRef } from 'react';
import { Checkbox, LabelledField } from '../../components';
import { Box, Demo, DemoPanel } from '../utils/components';
import { useScrollLock } from './use-scroll-lock';

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
    <Demo>
      <DemoPanel style={{ minHeight: '100vh' }}>
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
      </DemoPanel>
      <DemoPanel>
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
        <Box id="locked-div" hasOverflow ref={divRef} />
      </DemoPanel>
    </Demo>
  );
};
