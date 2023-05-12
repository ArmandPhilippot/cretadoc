import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Icon, Link } from '../../atoms';
import { Collapsible, type CollapsibleProps } from './collapsible';

const ControlledCollapsible = ({
  hasDissociatedBtn,
  isExpanded: expanded,
  ...props
}: Omit<CollapsibleProps, 'icon' | 'onExpand'>) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <Collapsible
      {...props}
      hasDissociatedBtn={hasDissociatedBtn}
      icon={
        <Icon
          animationSpeed="fast"
          color={hasDissociatedBtn ? 'primary' : 'regular'}
          orientation={isExpanded ? 'bottom' : 'right'}
          shape="angle"
          size="sm"
        />
      }
      isExpanded={isExpanded}
      onExpand={handleExpand}
    />
  );
};

const meta = {
  title: 'Components/Molecules/Collapsible',
  component: Collapsible,
  render: ControlledCollapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof ControlledCollapsible>;

export const Example: Story = {
  args: {
    children: 'Hidden content',
    isExpanded: false,
    summary: 'A label',
  },
};

export const LinkLabel: Story = {
  args: {
    ...Example.args,
    expandBtnLabel: 'Expand',
    hasDissociatedBtn: true,
    summary: <Link to="#">A link</Link>,
  },
};
