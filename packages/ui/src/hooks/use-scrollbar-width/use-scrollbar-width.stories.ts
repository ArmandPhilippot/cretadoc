import type { Meta, StoryObj } from '@storybook/react';
import { UseScrollbarWidthDemo } from './use-scrollbar-width.demo';

const meta = {
  title: 'Hooks/useScrollbarWidth',
  component: UseScrollbarWidthDemo,
} satisfies Meta<typeof UseScrollbarWidthDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
