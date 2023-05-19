import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../components';
import { UseVisuallyHiddenDemo } from './use-visually-hidden.demo';

const meta = {
  title: 'Hooks/useVisuallyHidden',
  component: UseVisuallyHiddenDemo,
} satisfies Meta<typeof UseVisuallyHiddenDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VisuallyHidden: Story = {
  args: {
    children: 'Some hidden contents.',
  },
};

export const Focusable: Story = {
  args: {
    children: (
      <>
        Some hidden contents with a <Link to="#">focusable link.</Link>.
      </>
    ),
    isFocusable: true,
  },
};
