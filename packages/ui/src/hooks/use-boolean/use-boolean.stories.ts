import type { Meta, StoryObj } from '@storybook/react';
import { UseBooleanDemo } from './use-boolean.demo';

const meta = {
  title: 'Hooks/useBoolean',
  component: UseBooleanDemo,
} satisfies Meta<typeof UseBooleanDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
