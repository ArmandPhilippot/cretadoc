import type { Meta, StoryObj } from '@storybook/react';
import { UseMatchMediaDemo } from './use-match-media.demo';

const meta = {
  title: 'Hooks/useMatchMedia',
  component: UseMatchMediaDemo,
} satisfies Meta<typeof UseMatchMediaDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    query: '(min-width: 1000px)',
  },
};
