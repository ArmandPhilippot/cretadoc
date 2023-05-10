import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useState, useCallback } from 'react';
import { Select, type SelectProps } from './select';

const meta = {
  component: Select,
  title: 'Components/Atoms/Forms/Fields/Select',
  excludeStories: /Controlled.*$/,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ControlledSelect = <T extends boolean>({
  multiple,
  placeholder,
  ...args
}: SelectProps<T>) => {
  const [selected, setSelected] = useState(multiple === true ? [''] : '');
  const handler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (multiple)
        setSelected(
          Array.from(e.target.selectedOptions, (option) => option.value)
        );
      else setSelected(e.target.value);
    },
    [multiple]
  );

  return (
    <Select
      {...args}
      multiple={multiple}
      onChange={handler}
      placeholder={placeholder}
      value={selected as SelectProps<T>['value']}
    />
  );
};

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const optionsWithDisabled = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2', isDisabled: true },
  { label: 'Option 3', value: 'option-3', isDisabled: true },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

const SelectTemplate: Story = {
  args: {
    isDisabled: false,
    isRequired: false,
    multiple: false,
    options,
    value: '',
  },
  render: ControlledSelect,
};

export const SingleChoice: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a default select field',
    options,
  },
};

export const MultipleChoices: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a select field with multiple choices',
    multiple: true,
    options,
  },
};

export const IsDisabled: Story = {
  ...SelectTemplate,
  name: 'State: Disabled',
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a disabled select field',
    isDisabled: true,
    options,
  },
};

export const IsRequired: Story = {
  ...SelectTemplate,
  name: 'State: Required',
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a required select field',
    isRequired: true,
    options,
  },
};

export const WithDisabledOptions: Story = {
  ...SelectTemplate,
  name: 'State: Disabled options',
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a select field with disabled options',
    options: optionsWithDisabled,
  },
};

export const Placeholder: Story = {
  ...SelectTemplate,
  args: {
    ...SelectTemplate.args,
    'aria-label': 'Example of a select field with placeholder',
    options,
    placeholder: 'Select something...',
  },
};
