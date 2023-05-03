import type { Meta, StoryObj } from '@storybook/react';
import { Main } from './main';

const meta = {
  title: 'Components/Atoms/Layout/Main',
  component: Main,
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'This is the main content of the page.',
  },
};
