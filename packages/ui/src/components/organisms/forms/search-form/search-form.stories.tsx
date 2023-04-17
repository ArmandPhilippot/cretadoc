import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon, Input } from '../../../atoms';
import { SearchForm } from './search-form';

const meta = {
  title: 'Components/Organisms/Forms/Search Form',
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const SearchFormTemplate: Story = {
  args: {
    button: <Button type="submit">Search</Button>,
    field: <Input id="example" name="example" type="search" />,
    label: 'Search:',
  },
};

export const LayoutColumn: Story = {
  name: 'Layout: Column',
  args: {
    ...SearchFormTemplate.args,
    layout: 'column',
  },
};

export const LayoutRow: Story = {
  name: 'Layout: Row',
  args: {
    ...SearchFormTemplate.args,
    layout: 'row',
  },
};

export const WithoutSpacing: Story = {
  name: 'Layout: Without spacing',
  args: {
    ...SearchFormTemplate.args,
    hasSpacing: false,
  },
};

export const IconAsButton: Story = {
  name: 'Contents: Icon as button',
  args: {
    ...SearchFormTemplate.args,
    button: (
      <Button kind="neutral" type="submit" aria-label="Search">
        <Icon color="primary" shape="search" size="sm" />
      </Button>
    ),
    buttonPosition: 'end',
    hasSpacing: false,
    layout: 'row',
  },
};

export const VisuallyHiddenLabel: Story = {
  name: 'Contents: Visually hidden label',
  args: {
    ...SearchFormTemplate.args,
    field: (
      <Input
        id="search"
        name="search"
        placeholder="Keywords..."
        type="search"
      />
    ),
    isLabelHidden: true,
    layout: 'row',
  },
};
