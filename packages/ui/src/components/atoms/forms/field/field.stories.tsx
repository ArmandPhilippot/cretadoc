import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback } from 'react';
import { Field, type FieldType, type FieldProps } from './field';

const meta = {
  component: Field,
  title: 'Components/Atoms/Forms/Field',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledField = <T extends FieldType>({
  value,
  ...args
}: FieldProps<T>) => {
  const [_, updateArgs] = useArgs<FieldProps<T>>();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateArgs({ ...args, value: e.target.value });
    },
    [args, updateArgs]
  );

  return <Field {...args} onChange={handleChange} value={value} />;
};

const FieldTemplate: Story = {
  args: {
    id: 'default',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    name: 'default',
    type: 'text',
    value: '',
  },
  render: ControlledField,
};

export const IsEditable: Story = {
  ...FieldTemplate,
  name: 'State: Editable',
  args: {
    ...FieldTemplate.args,
    id: 'disabled',
    name: 'disabled',
  },
};

export const IsDisabled: Story = {
  ...FieldTemplate,
  name: 'State: Disabled',
  args: {
    ...FieldTemplate.args,
    id: 'disabled',
    isDisabled: true,
    name: 'disabled',
  },
};

export const IsReadOnly: Story = {
  ...FieldTemplate,
  name: 'State: Readonly',
  args: {
    ...FieldTemplate.args,
    id: 'readonly',
    isReadOnly: true,
    name: 'readonly',
  },
};

export const IsRequired: Story = {
  ...FieldTemplate,
  name: 'State: Required',
  args: {
    ...FieldTemplate.args,
    id: 'required',
    isRequired: true,
    name: 'required',
  },
};

export const DateField: Story = {
  ...FieldTemplate,
  name: 'Type: Date',
  args: {
    ...FieldTemplate.args,
    id: 'date',
    name: 'date',
    type: 'date',
  },
};

export const DatetimeField: Story = {
  ...FieldTemplate,
  name: 'Type: Datetime',
  args: {
    ...FieldTemplate.args,
    id: 'datetime',
    name: 'datetime',
    type: 'datetime-local',
  },
};

export const EmailField: Story = {
  ...FieldTemplate,
  name: 'Type: Email',
  args: {
    ...FieldTemplate.args,
    id: 'email',
    name: 'email',
    type: 'email',
  },
};

export const MonthField: Story = {
  ...FieldTemplate,
  name: 'Type: Month',
  args: {
    ...FieldTemplate.args,
    id: 'month',
    name: 'month',
    type: 'month',
  },
};

export const NumberField: Story = {
  ...FieldTemplate,
  name: 'Type: Number',
  args: {
    ...FieldTemplate.args,
    id: 'number',
    name: 'number',
    type: 'number',
  },
};

export const PasswordField: Story = {
  ...FieldTemplate,
  name: 'Type: Password',
  args: {
    ...FieldTemplate.args,
    id: 'password',
    name: 'password',
    type: 'password',
  },
};

export const SearchField: Story = {
  ...FieldTemplate,
  name: 'Type: Search',
  args: {
    ...FieldTemplate.args,
    id: 'search',
    name: 'search',
    type: 'search',
  },
};

export const TelField: Story = {
  ...FieldTemplate,
  name: 'Type: Tel',
  args: {
    ...FieldTemplate.args,
    id: 'tel',
    name: 'tel',
    type: 'tel',
  },
};

export const TextField: Story = {
  ...FieldTemplate,
  name: 'Type: Text',
  args: {
    ...FieldTemplate.args,
    id: 'text',
    name: 'text',
    type: 'text',
  },
};

export const TextareaField: Story = {
  ...FieldTemplate,
  name: 'Type: Textarea',
  args: {
    ...FieldTemplate.args,
    id: 'textarea',
    name: 'textarea',
    type: 'textarea',
  },
};

export const TimeField: Story = {
  ...FieldTemplate,
  name: 'Type: Time',
  args: {
    ...FieldTemplate.args,
    id: 'time',
    name: 'time',
    type: 'time',
  },
};

export const UrlField: Story = {
  ...FieldTemplate,
  name: 'Type: Url',
  args: {
    ...FieldTemplate.args,
    id: 'url',
    name: 'url',
    type: 'url',
  },
};

export const WeekField: Story = {
  ...FieldTemplate,
  name: 'Type: Week',
  args: {
    ...FieldTemplate.args,
    id: 'week',
    name: 'week',
    type: 'week',
  },
};
