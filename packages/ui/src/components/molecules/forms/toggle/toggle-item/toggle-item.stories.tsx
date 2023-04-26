import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { ToggleItem, type ToggleItemProps } from './toggle-item';

const meta = {
  title: 'Components/Molecules/Forms/Toggle/Item',
  component: ToggleItem,
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof ToggleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledToggleItem = ({
  isChecked: checked,
  ...args
}: ToggleItemProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = useCallback(() => {
    setIsChecked((prevState) => !prevState);
  }, []);

  return <ToggleItem {...args} isChecked={isChecked} onToggle={handleChange} />;
};

const ToggleItemTemplate: Story = {
  args: {
    id: 'item',
    label: 'Activate?',
    name: 'item',
  },
  render: ControlledToggleItem,
};

export const Unchecked: Story = {
  ...ToggleItemTemplate,
};

export const Checked: Story = {
  ...ToggleItemTemplate,
  args: {
    ...ToggleItemTemplate.args,
    id: 'checked',
    isChecked: true,
    name: 'checked',
  },
};

export const Disabled: Story = {
  ...ToggleItemTemplate,
  args: {
    ...ToggleItemTemplate.args,
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};
