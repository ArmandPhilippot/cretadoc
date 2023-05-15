import type { Meta, StoryObj } from '@storybook/react';
import { UseScrollPositionDemo } from './use-scroll-position.demo';

const meta = {
  title: 'Hooks/useScrollPosition',
  component: UseScrollPositionDemo,
} satisfies Meta<typeof UseScrollPositionDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
