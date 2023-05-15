import type { Meta, StoryObj } from '@storybook/react';
import { UseScrollLockDemo } from './use-scroll-lock.demo';

const meta = {
  title: 'Hooks/useScrollLock',
  component: UseScrollLockDemo,
} satisfies Meta<typeof UseScrollLockDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
