import type { Meta, StoryObj } from '@storybook/react';
import { ShadowsPreview, ShadowColorGuidelines } from './shadows';

const meta = {
  title: 'Themes/Tokens/Shadows',
  component: ShadowsPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShadowsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Color: Story = {
  args: {
    tokens: [
      'shadow.critical.bottom.left.raised',
      'shadow.info.bottom.left.raised',
      'shadow.inverted.bottom.left.raised',
      'shadow.muted.bottom.left.raised',
      'shadow.regular.bottom.left.raised',
      'shadow.success.bottom.left.raised',
      'shadow.warning.bottom.left.raised',
    ],
  },
};

export const ColorDirectives: StoryObj = {
  args: {},
  render: ShadowColorGuidelines,
};

export const Direction: Story = {
  args: {
    tokens: [
      'shadow.regular.top.left.raised',
      'shadow.regular.top.center.raised',
      'shadow.regular.top.right.raised',
      'shadow.regular.bottom.left.raised',
      'shadow.regular.bottom.center.raised',
      'shadow.regular.bottom.right.raised',
    ],
  },
};

export const Elevation: Story = {
  args: {
    tokens: [
      'shadow.regular.bottom.left.raised',
      'shadow.regular.bottom.left.elevated',
      'shadow.regular.bottom.left.floating',
    ],
  },
};
