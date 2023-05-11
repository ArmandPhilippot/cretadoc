import type { Meta, StoryObj } from '@storybook/react';
import { Aside } from './aside';

const meta = {
  title: 'Components/Atoms/Layout/Aside',
  component: Aside,
} satisfies Meta<typeof Aside>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'This is an aside.',
  },
};
