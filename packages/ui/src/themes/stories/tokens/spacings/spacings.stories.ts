import type { Meta, StoryObj } from '@storybook/react';
import { SpacingsPreview } from './spacings';

const meta = {
  title: 'Themes/Tokens/Spacings',
  component: SpacingsPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SpacingsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  args: {
    tokens: [
      'spacing.xxs',
      'spacing.xs',
      'spacing.sm',
      'spacing.md',
      'spacing.lg',
      'spacing.xl',
      'spacing.xxl',
    ],
  },
};

export const Margin: Story = {
  args: {
    kind: 'margin',
    tokens: [
      'spacing.xxs',
      'spacing.xs',
      'spacing.sm',
      'spacing.md',
      'spacing.lg',
      'spacing.xl',
      'spacing.xxl',
    ],
  },
};

export const Padding: Story = {
  args: {
    kind: 'padding',
    tokens: [
      'spacing.xxs',
      'spacing.xs',
      'spacing.sm',
      'spacing.md',
      'spacing.lg',
      'spacing.xl',
      'spacing.xxl',
    ],
  },
};
