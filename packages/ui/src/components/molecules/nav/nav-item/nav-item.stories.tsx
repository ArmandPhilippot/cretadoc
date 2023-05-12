import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { List } from '../../../atoms';
import { NavList } from '../nav-list';
import { NavItem, type NavItemProps } from './nav-item';

const meta = {
  title: 'Components/Molecules/Nav/Nav Item',
  component: NavItem,
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nav item',
    to: '#',
  },
  render: (args) => (
    <List hasMarker={false}>
      <NavItem {...args} />
    </List>
  ),
};

export const IsDisabled: Story = {
  ...Default,
  name: 'State: Disabled',
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const IsSelected: Story = {
  ...Default,
  name: 'State: Selected (stacked item)',
  args: {
    ...Default.args,
    isSelected: true,
  },
};

export const IsDisabledAndSelected: Story = {
  ...Default,
  name: 'State: Disabled and Selected',
  args: {
    ...Default.args,
    isDisabled: true,
    isSelected: true,
  },
};

export const WithSeparator: Story = {
  ...Default,
  name: 'Separator',
  args: {
    ...Default.args,
    sep: '•',
  },
};

const RenderNestedItems = ({ variant, ...props }: NavItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <List hasMarker={false}>
      <NavItem
        {...props}
        expandBtnAriaLabel={isExpanded ? 'Collapse' : 'Expand'}
        isExpanded={isExpanded}
        onExpand={handleExpand}
        variant={variant}
      >
        <NavList spacing={variant === 'block' ? null : undefined}>
          <NavItem label="Item 1" to="#" variant={variant} />
          <NavItem label="Item 2" to="#" variant={variant} />
        </NavList>
      </NavItem>
    </List>
  );
};

export const WithChildren: Story = {
  ...Default,
  name: 'With children',
  render: RenderNestedItems,
  args: {
    ...Default.args,
  },
};

export const BlockWithChildren: Story = {
  ...WithChildren,
  name: 'Block variant with children',
  args: {
    ...WithChildren.args,
    variant: 'block',
  },
};
