import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './visually-hidden';

const meta = {
  component: VisuallyHidden,
  title: 'Components/Atoms/Typography/Visually Hidden',
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

const VisuallyHiddenTemplate: Story = {
  args: {
    children: 'Some content not focusable.',
  },
};

export const NotFocusable: Story = {
  args: {
    ...VisuallyHiddenTemplate.args,
  },
};

export const Focusable: Story = {
  args: {
    ...VisuallyHiddenTemplate.args,
    children: <a href="#anchor">A skip to content link</a>,
    isFocusable: true,
  },
};

export const DeepFocusable: Story = {
  args: {
    ...VisuallyHiddenTemplate.args,
    children: (
      <div>
        A hidden container with <a href="#anchor">a link</a> inside it.
      </div>
    ),
    isFocusable: true,
  },
};
