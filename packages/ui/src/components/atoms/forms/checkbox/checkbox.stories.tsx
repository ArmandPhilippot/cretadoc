import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback } from 'react';
import { Checkbox, type CheckboxProps } from './checkbox';

const meta = {
  component: Checkbox,
  title: 'Components/Atoms/Forms/Checkbox',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledCheckbox = ({ isChecked, ...args }: CheckboxProps) => {
  const [_, updateArgs] = useArgs<CheckboxProps>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ ...args, isChecked: e.target.checked });
    },
    [args, updateArgs]
  );

  return <Checkbox {...args} isChecked={isChecked} onChange={handleChange} />;
};

const CheckboxTemplate: Story = {
  args: {
    id: 'default',
    isChecked: false,
    isDisabled: false,
    isRequired: false,
    name: 'default',
  },
  render: ControlledCheckbox,
};

export const IsUnchecked: Story = {
  ...CheckboxTemplate,
  name: 'State: Unchecked',
  args: {
    ...CheckboxTemplate.args,
    id: 'unchecked',
    name: 'unchecked',
  },
};

export const IsChecked: Story = {
  ...CheckboxTemplate,
  name: 'State: Checked',
  args: {
    ...CheckboxTemplate.args,
    id: 'checked',
    isChecked: true,
    name: 'checked',
  },
};

export const IsDisabled: Story = {
  ...CheckboxTemplate,
  name: 'State: Disabled',
  args: {
    ...CheckboxTemplate.args,
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};

export const IsRequired: Story = {
  ...CheckboxTemplate,
  name: 'State: Required',
  args: {
    ...CheckboxTemplate.args,
    id: 'required',
    isRequired: true,
    name: 'required',
  },
};
