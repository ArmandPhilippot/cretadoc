import type { Meta as SBMeta, StoryObj } from '@storybook/react';
import { Meta } from './meta';

const meta = {
  title: 'Components/Molecules/Meta',
  component: Meta,
} satisfies SBMeta<typeof Meta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    items: [
      { id: 'publication-date', label: 'Published on', value: '18 May 2023' },
      { id: 'update-date', label: 'Updated on', value: '19 May 2023' },
    ],
  },
};

export const InlinedMeta: Story = {
  args: {
    ...Example.args,
    isInline: true,
  },
};

export const SizeSM: Story = {
  args: {
    ...Example.args,
    size: 'sm',
  },
};

export const SizeMD: Story = {
  args: {
    ...Example.args,
    size: 'md',
  },
};

export const SizeLG: Story = {
  args: {
    ...Example.args,
    size: 'lg',
  },
};
