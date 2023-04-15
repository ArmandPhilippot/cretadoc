import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta = {
  component: Spinner,
  title: 'Components/Atoms/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    children: 'Loading...',
  },
};

export const SizeXS: Story = {
  name: 'Size: Extra-small',
  args: {
    ...WithChildren.args,
    size: 'xs',
  },
};

export const SizeSM: Story = {
  name: 'Size: Small',
  args: {
    ...WithChildren.args,
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: Medium',
  args: {
    ...WithChildren.args,
    size: 'md',
  },
};

export const SizeLG: Story = {
  name: 'Size: Large',
  args: {
    ...WithChildren.args,
    size: 'lg',
  },
};

export const SizeXL: Story = {
  name: 'Size: Extra-large',
  args: {
    ...WithChildren.args,
    size: 'xl',
  },
};

export const Left: Story = {
  name: 'Position: Left',
  args: {
    ...WithChildren.args,
    position: 'left',
  },
};

export const Right: Story = {
  name: 'Position: Right',
  args: {
    ...WithChildren.args,
    position: 'right',
  },
};

export const Bottom: Story = {
  name: 'Position: Bottom',
  args: {
    ...WithChildren.args,
    position: 'bottom',
  },
};

export const Top: Story = {
  name: 'Position: Top',
  args: {
    ...WithChildren.args,
    position: 'top',
  },
};
