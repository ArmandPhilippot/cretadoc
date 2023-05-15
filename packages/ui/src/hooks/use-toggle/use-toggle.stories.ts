import type { Meta, StoryObj } from '@storybook/react';
import { UseToggleDemo } from './use-toggle.demo';

const meta = {
  title: 'Hooks/useToggle',
  component: UseToggleDemo,
} satisfies Meta<typeof UseToggleDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {},
};
