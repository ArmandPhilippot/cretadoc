import type { Meta, StoryObj } from '@storybook/react';
import { UseViewportSizeDemo } from './use-viewport-size.demo';

const meta = {
  title: 'Hooks/useViewportSize',
  component: UseViewportSizeDemo,
} satisfies Meta<typeof UseViewportSizeDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
