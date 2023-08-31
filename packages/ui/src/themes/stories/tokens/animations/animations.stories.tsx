import type { Meta, StoryObj } from '@storybook/react';
import { AnimationPreview } from './animations';

const meta: Meta = {
  title: 'Themes/Tokens/Animations',
  component: AnimationPreview,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AnimationCSS: StoryObj = {
  args: {},
  render: () => (
    <AnimationPreview
      animation="slide"
      duration="slower"
      timingFunction="linear"
    />
  ),
};

export const TransitionCSS: StoryObj = {
  args: {},
  render: () => (
    <AnimationPreview duration="medium" timingFunction="easeInOut" />
  ),
};
