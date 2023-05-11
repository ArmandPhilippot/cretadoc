import type { Meta, StoryObj } from '@storybook/react';
import { Article } from './article';

const meta = {
  title: 'Components/Atoms/Layout/Article',
  component: Article,
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: 'This is an article. You should add an heading.',
  },
};
