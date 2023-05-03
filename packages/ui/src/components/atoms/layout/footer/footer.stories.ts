import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

const meta = {
  title: 'Components/Atoms/Layout/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'This is a footer.',
  },
};
