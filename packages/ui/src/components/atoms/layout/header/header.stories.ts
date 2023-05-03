import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta = {
  title: 'Components/Atoms/Layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'This is a header.',
  },
};
