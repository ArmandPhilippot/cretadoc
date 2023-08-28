import type { Meta, StoryObj } from '@storybook/react';
import { Truncate } from './truncate';

const meta = {
  title: 'Components/Atoms/Typography/Truncate',
  component: Truncate,
} satisfies Meta<typeof Truncate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'Some very very very long text',
    max: '14ch',
  },
};
