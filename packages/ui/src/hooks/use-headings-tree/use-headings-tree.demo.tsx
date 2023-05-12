import { type FC, useRef } from 'react';
import { Demo, DemoPanel } from '../utils/components';
import {
  type UseHeadingsTreeOptions,
  useHeadingsTree,
} from './use-headings-tree';

export type UseHeadingsTreeDemoProps = Pick<
  UseHeadingsTreeOptions,
  'fromLevel' | 'toLevel'
> & {
  showOnlyHeadingsInDemo?: boolean;
};

export const UseHeadingsTreeDemo: FC<UseHeadingsTreeDemoProps> = ({
  fromLevel,
  showOnlyHeadingsInDemo = false,
  toLevel,
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const headingsNode = useHeadingsTree({
    fromLevel,
    toLevel,
    wrapper: showOnlyHeadingsInDemo ? inputRef.current ?? undefined : undefined,
  });

  return (
    <Demo>
      <DemoPanel heading="Given the following structure:">
        <div ref={inputRef}>
          <h1>1. Level 1</h1>
          <h2>1.1. Level 2</h2>
          <h2>1.2. Level 2</h2>
          <h3>1.2.1. Level 3</h3>
          <h4>1.2.1.1. Level 4</h4>
          <h4>1.2.1.2. Level 4</h4>
          <h5>1.2.1.2.1. Level 5</h5>
          <h6>1.2.1.2.1.1. Level 6</h6>
          <h6>1.2.1.2.1.2. Level 6</h6>
          <h5>1.2.1.2.2. Level 5</h5>
          <h3>1.2.2. Level 3</h3>
          <h2>1.3. Level 2</h2>
          <h3>1.3.1. Level 3</h3>
          <h3>1.3.2. Level 3</h3>
        </div>
      </DemoPanel>
      <DemoPanel heading="The output is:">
        <pre>
          <code>{JSON.stringify(headingsNode, null, 2)}</code>
        </pre>
      </DemoPanel>
    </Demo>
  );
};
