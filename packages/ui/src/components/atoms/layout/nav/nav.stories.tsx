import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from './nav';

const meta = {
  title: 'Components/Atoms/Layout/Nav',
  component: Nav,
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: (
      <ul>
        <li>
          <a href="#somewhere">Nav item 1</a>
        </li>
        <li>
          <a href="#somewhere">Nav item 2</a>
        </li>
        <li>
          <a href="#somewhere">Nav item 3</a>
        </li>
      </ul>
    ),
  },
};
