import type { Meta, StoryObj } from '@storybook/react';
import { List } from '../../../atoms';
import { NavItem } from './nav-item';

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
    sep: '>',
  },
};
