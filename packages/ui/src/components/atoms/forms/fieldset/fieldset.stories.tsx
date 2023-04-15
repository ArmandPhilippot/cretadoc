import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../fields';
import { Fieldset, type FieldsetProps } from './fieldset';

const meta = {
  component: Fieldset,
  title: 'Components/Atoms/Forms/Fieldset',
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

const FieldsetWithFields = (args: FieldsetProps) => (
  <Fieldset {...args}>
    <Input id="field" name="field" type="text" />
  </Fieldset>
);

export const Enabled: Story = {
  name: 'State: Enabled',
  args: {
    ...Default.args,
    isDisabled: false,
  },
  render: FieldsetWithFields,
};

export const Disabled: Story = {
  name: 'State: Disabled',
  args: {
    ...Default.args,
    isDisabled: true,
  },
  render: FieldsetWithFields,
};
