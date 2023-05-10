import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback } from 'react';
import { Radio, type RadioProps } from './radio';

const meta = {
  component: Radio,
  title: 'Components/Atoms/Forms/Fields/Radio',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledRadio = ({ isChecked, ...args }: RadioProps) => {
  const [_, updateArgs] = useArgs<RadioProps>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ ...args, isChecked: e.target.checked });
    },
    [args, updateArgs]
  );

  return <Radio {...args} isChecked={isChecked} onChange={handleChange} />;
};

const RadioTemplate: Story = {
  args: {
    id: 'default',
    isChecked: false,
    isDisabled: false,
    isRequired: false,
    name: 'default',
  },
  render: ControlledRadio,
};

export const IsUnchecked: Story = {
  ...RadioTemplate,
  name: 'State: Unchecked',
  args: {
    ...RadioTemplate.args,
    'aria-label': 'Example of an unchecked radio button',
    id: 'unchecked',
    name: 'unchecked',
  },
};

export const IsChecked: Story = {
  ...RadioTemplate,
  name: 'State: Checked',
  args: {
    ...RadioTemplate.args,
    'aria-label': 'Example of a checked radio button',
    id: 'checked',
    isChecked: true,
    name: 'checked',
  },
};

export const IsDisabled: Story = {
  ...RadioTemplate,
  name: 'State: Disabled',
  args: {
    ...RadioTemplate.args,
    'aria-label': 'Example of a disabled radio button',
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};

export const IsRequired: Story = {
  ...RadioTemplate,
  name: 'State: Required',
  args: {
    ...RadioTemplate.args,
    'aria-label': 'Example of an required radio button',
    id: 'required',
    isRequired: true,
    name: 'required',
  },
};
