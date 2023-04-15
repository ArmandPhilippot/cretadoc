import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback } from 'react';
import { Input, type InputProps } from './input';

const meta = {
  component: Input,
  title: 'Components/Atoms/Forms/Fields/Input',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledInput = ({ value, ...args }: InputProps) => {
  const [_, updateArgs] = useArgs<InputProps>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ ...args, value: e.target.value });
    },
    [args, updateArgs]
  );

  return <Input {...args} onChange={handleChange} value={value} />;
};

const InputTemplate: Story = {
  args: {
    id: 'default',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    name: 'default',
    type: 'text',
    value: '',
  },
  render: ControlledInput,
};

export const IsEditable: Story = {
  ...InputTemplate,
  name: 'State: Editable',
  args: {
    ...InputTemplate.args,
    id: 'disabled',
    name: 'disabled',
  },
};

export const IsDisabled: Story = {
  ...InputTemplate,
  name: 'State: Disabled',
  args: {
    ...InputTemplate.args,
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};

export const IsReadOnly: Story = {
  ...InputTemplate,
  name: 'State: Readonly',
  args: {
    ...InputTemplate.args,
    id: 'readonly',
    isReadOnly: true,
    name: 'readonly',
  },
};

export const IsRequired: Story = {
  ...InputTemplate,
  name: 'State: Required',
  args: {
    ...InputTemplate.args,
    id: 'required',
    isRequired: true,
    name: 'required',
  },
};

export const DateInput: Story = {
  ...InputTemplate,
  name: 'Type: Date',
  args: {
    ...InputTemplate.args,
    id: 'date',
    name: 'date',
    type: 'date',
  },
};

export const DatetimeInput: Story = {
  ...InputTemplate,
  name: 'Type: Datetime',
  args: {
    ...InputTemplate.args,
    id: 'datetime',
    name: 'datetime',
    type: 'datetime-local',
  },
};

export const EmailInput: Story = {
  ...InputTemplate,
  name: 'Type: Email',
  args: {
    ...InputTemplate.args,
    id: 'email',
    name: 'email',
    type: 'email',
  },
};

export const MonthInput: Story = {
  ...InputTemplate,
  name: 'Type: Month',
  args: {
    ...InputTemplate.args,
    id: 'month',
    name: 'month',
    type: 'month',
  },
};

export const NumberInput: Story = {
  ...InputTemplate,
  name: 'Type: Number',
  args: {
    ...InputTemplate.args,
    id: 'number',
    name: 'number',
    type: 'number',
  },
};

export const PasswordInput: Story = {
  ...InputTemplate,
  name: 'Type: Password',
  args: {
    ...InputTemplate.args,
    id: 'password',
    name: 'password',
    type: 'password',
  },
};

export const SearchInput: Story = {
  ...InputTemplate,
  name: 'Type: Search',
  args: {
    ...InputTemplate.args,
    id: 'search',
    name: 'search',
    type: 'search',
  },
};

export const TelInput: Story = {
  ...InputTemplate,
  name: 'Type: Tel',
  args: {
    ...InputTemplate.args,
    id: 'tel',
    name: 'tel',
    type: 'tel',
  },
};

export const TextInput: Story = {
  ...InputTemplate,
  name: 'Type: Text',
  args: {
    ...InputTemplate.args,
    id: 'text',
    name: 'text',
    type: 'text',
  },
};

export const TimeInput: Story = {
  ...InputTemplate,
  name: 'Type: Time',
  args: {
    ...InputTemplate.args,
    id: 'time',
    name: 'time',
    type: 'time',
  },
};

export const UrlInput: Story = {
  ...InputTemplate,
  name: 'Type: Url',
  args: {
    ...InputTemplate.args,
    id: 'url',
    name: 'url',
    type: 'url',
  },
};

export const WeekInput: Story = {
  ...InputTemplate,
  name: 'Type: Week',
  args: {
    ...InputTemplate.args,
    id: 'week',
    name: 'week',
    type: 'week',
  },
};
