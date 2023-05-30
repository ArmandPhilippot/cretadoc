import type { Meta, StoryObj } from '@storybook/react';
import { Border } from './components/border';
import { PreviewList } from './components/preview-list';

const meta: Meta = {
  title: 'Themes/Tokens/Borders',
  component: Border,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Radius: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Border token="border.radius.sharp" />
      <Border token="border.radius.soft" />
      <Border token="border.radius.softer" />
      <Border token="border.radius.pill" />
      <Border token="border.radius.circle" />
    </PreviewList>
  ),
};

export const Size: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Border token="border.size.sm" />
      <Border token="border.size.md" />
      <Border token="border.size.lg" />
    </PreviewList>
  ),
};

export const Style: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Border token="border.style.regular" />
    </PreviewList>
  ),
};
