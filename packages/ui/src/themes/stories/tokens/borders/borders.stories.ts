import type { Meta, StoryObj } from '@storybook/react';
import { BordersPreview } from './borders';

const meta = {
  title: 'Themes/Tokens/Borders',
  component: BordersPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BordersPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Radius: Story = {
  args: {
    tokens: [
      'border.radius.sharp',
      'border.radius.soft',
      'border.radius.softer',
      'border.radius.pill',
      'border.radius.circle',
    ],
  },
};

export const Size: Story = {
  args: {
    tokens: ['border.size.sm', 'border.size.md', 'border.size.lg'],
  },
};

export const Style: Story = {
  args: {
    tokens: ['border.style.regular'],
  },
};
