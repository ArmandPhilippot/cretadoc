import type { Meta, StoryObj } from '@storybook/react';
import { InfiniteAnimation, Transition } from './components/animation';
import { PreviewList } from './components/preview-list';

const meta: Meta = {
  title: 'Themes/Tokens/Animations',
  component: InfiniteAnimation,
  parameters: {
    layout: 'full',
  },
};

export default meta;

export const AnimationCSS: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <InfiniteAnimation />
    </PreviewList>
  ),
};

export const TransitionCSS: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Transition />
    </PreviewList>
  ),
};
