import type { Meta, StoryObj } from '@storybook/react';
import { PreviewList } from './components/preview-list';
import { Margin, Padding, Spacing } from './components/spacing';

const meta: Meta = {
  title: 'Themes/Tokens/Spacings',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const SpacingPreview: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Spacing token="spacing.xxs" />
      <Spacing token="spacing.xs" />
      <Spacing token="spacing.sm" />
      <Spacing token="spacing.md" />
      <Spacing token="spacing.lg" />
      <Spacing token="spacing.xl" />
      <Spacing token="spacing.xxl" />
    </PreviewList>
  ),
};

export const MarginPreview: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={1}>
      <Margin token="spacing.xxs" />
      <Margin token="spacing.xs" />
      <Margin token="spacing.sm" />
      <Margin token="spacing.md" />
      <Margin token="spacing.lg" />
      <Margin token="spacing.xl" />
      <Margin token="spacing.xxl" />
    </PreviewList>
  ),
};

export const PaddingPreview: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={1}>
      <Padding token="spacing.xxs" />
      <Padding token="spacing.xs" />
      <Padding token="spacing.sm" />
      <Padding token="spacing.md" />
      <Padding token="spacing.lg" />
      <Padding token="spacing.xl" />
      <Padding token="spacing.xxl" />
    </PreviewList>
  ),
};
