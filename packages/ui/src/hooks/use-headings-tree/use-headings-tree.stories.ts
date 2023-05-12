import type { Meta, StoryObj } from '@storybook/react';
import { UseHeadingsTreeDemo } from './use-headings-tree.demo';

const meta = {
  title: 'Hooks/useHeadingsTree',
  component: UseHeadingsTreeDemo,
  argTypes: {
    fromLevel: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      type: {
        name: 'number',
      },
    },
    toLevel: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      type: {
        name: 'number',
      },
    },
    showOnlyHeadingsInDemo: {
      control: {
        type: 'boolean',
      },
      description: 'Exclude Storybook headings.',
      type: 'boolean',
    },
  },
} satisfies Meta<typeof UseHeadingsTreeDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    fromLevel: undefined,
    toLevel: undefined,
  },
};
