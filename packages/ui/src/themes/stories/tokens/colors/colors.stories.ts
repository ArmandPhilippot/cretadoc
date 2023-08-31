import type { Meta, StoryObj } from '@storybook/react';
import { ColorsPreview } from './colors';

const meta = {
  title: 'Themes/Tokens/Colors',
  component: ColorsPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Background: Story = {
  args: {
    hasBackground: true,
    tokens: [
      'color.background.critical',
      'color.background.info',
      'color.background.inverted.base',
      'color.background.inverted.dark',
      'color.background.inverted.light',
      'color.background.muted',
      'color.background.regular.base',
      'color.background.regular.dark',
      'color.background.regular.light',
      'color.background.success',
      'color.background.warning',
    ],
  },
};

export const Border: Story = {
  args: {
    hasBorders: true,
    tokens: [
      'color.borders.critical',
      'color.borders.info',
      'color.borders.inverted.base',
      'color.borders.inverted.dark',
      'color.borders.inverted.light',
      'color.borders.muted',
      'color.borders.regular.base',
      'color.borders.regular.dark',
      'color.borders.regular.light',
      'color.borders.success',
      'color.borders.warning',
    ],
  },
};

export const Foreground: Story = {
  args: {
    content: 'Sample',
    tokens: [
      'color.foreground.critical',
      'color.foreground.info',
      'color.foreground.muted',
      'color.foreground.regular.base',
      'color.foreground.regular.dark',
      'color.foreground.regular.light',
      'color.foreground.success',
      'color.foreground.warning',
    ],
  },
};

export const ForegroundOnBackground: Story = {
  args: {
    content: 'Sample',
    hasBackground: true,
    tokens: [
      'color.foreground.onCritical',
      'color.foreground.onInfo',
      'color.foreground.onInverted.base',
      'color.foreground.onInverted.dark',
      'color.foreground.onInverted.light',
      'color.foreground.onMuted',
      'color.foreground.onPrimary.base',
      'color.foreground.onPrimary.dark',
      'color.foreground.onPrimary.light',
      'color.foreground.onSuccess',
      'color.foreground.onWarning',
    ],
  },
};

export const PrimaryAsForeground: Story = {
  args: {
    content: 'Sample',
    tokens: ['color.primary.base', 'color.primary.dark', 'color.primary.light'],
  },
};

export const PrimaryAsBackground: Story = {
  args: {
    hasBackground: true,
    tokens: ['color.primary.base', 'color.primary.dark', 'color.primary.light'],
  },
};

export const PrimaryAsBorders: Story = {
  args: {
    hasBorders: true,
    tokens: ['color.primary.base', 'color.primary.dark', 'color.primary.light'],
  },
};
