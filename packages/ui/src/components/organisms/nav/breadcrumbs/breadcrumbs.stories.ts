import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

const meta = {
  title: 'Components/Organisms/Nav/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', url: '#' },
      { id: 'doc', label: 'Documentation', url: '#' },
      { id: 'current', label: 'Current page', url: '#' },
    ],
  },
};

export const TextSeparator: Story = {
  args: {
    ...Example.args,
    sep: '>',
  },
};

export const LastItemHidden: Story = {
  args: {
    ...Example.args,
    isLastItemHidden: true,
    sep: '>',
  },
};
