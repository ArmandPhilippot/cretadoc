import type { Meta, StoryObj } from '@storybook/react';
import { ToggleItem } from '../toggle-item';
import { ToggleGroup } from './toggle-group';

const meta = {
  title: 'Components/Molecules/Forms/Toggle/Group',
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleToggle = () => {
  /* Do nothing. */
};

export const Example: Story = {
  args: {
    children: [
      <ToggleItem
        id="item-1"
        key="item-1"
        label="Item 1"
        name="item-1"
        onToggle={handleToggle}
      />,
      <ToggleItem
        id="item-2"
        key="item-2"
        label="Item 2"
        name="item-2"
        onToggle={handleToggle}
      />,
    ],
  },
};
