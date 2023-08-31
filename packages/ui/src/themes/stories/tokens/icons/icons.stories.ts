import type { Meta, StoryObj } from '@storybook/react';
import { IconsPreview } from './icons';

const meta = {
  title: 'Themes/Tokens/Icons',
  component: IconsPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Size: Story = {
  args: {
    tokens: [
      'icon.size.xs',
      'icon.size.sm',
      'icon.size.md',
      'icon.size.lg',
      'icon.size.xl',
    ],
  },
};
