import type { Meta, StoryObj } from '@storybook/react';
import { type UIEvent as ReactUIEvent, useCallback, useState } from 'react';
import { BackToTop, type BackToTopProps } from './back-to-top';

const targetId = 'top';

const RenderBackToTop = ({
  isVisible: defaultVisibility = true,
  ...props
}: BackToTopProps) => {
  const [isVisible, setIsVisible] = useState(defaultVisibility);
  const minScrollLength = 50;

  const handleScroll = useCallback(
    (e: ReactUIEvent<HTMLDivElement>) => {
      if (defaultVisibility) return;
      setIsVisible(e.currentTarget.scrollTop > minScrollLength);
    },
    [defaultVisibility]
  );

  return (
    <div
      id={targetId}
      onScroll={handleScroll}
      style={{ maxHeight: 300, overflow: 'auto' }}
    >
      <div style={{ height: 600 }} />
      <BackToTop {...props} isVisible={isVisible} />
    </div>
  );
};

const meta = {
  title: 'Components/Molecules/Buttons/Back to top',
  component: BackToTop,
  render: RenderBackToTop,
} satisfies Meta<typeof BackToTop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    targetId,
  },
};

export const LabelVisible: Story = {
  args: {
    ...Default.args,
    isLabelVisible: true,
  },
};

export const CustomLabel: Story = {
  args: {
    ...Default.args,
    isLabelVisible: true,
    label: 'To top',
  },
};

export const Hidden: Story = {
  args: {
    ...Default.args,
    isVisible: false,
  },
};
