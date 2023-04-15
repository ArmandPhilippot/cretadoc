import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta = {
  component: Icon,
  title: 'Components/Atoms/Icons',
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cross: Story = {
  name: 'Shape: Cross',
  args: {
    shape: 'cross',
  },
};

export const Hamburger: Story = {
  name: 'Shape: Hamburger',
  args: {
    shape: 'hamburger',
  },
};

export const ColorCritical: Story = {
  name: 'Color: Critical',
  args: {
    color: 'critical',
    shape: 'cross',
  },
};

export const ColorInfo: Story = {
  name: 'Color: Info',
  args: {
    color: 'info',
    shape: 'cross',
  },
};

export const ColorInverted: Story = {
  name: 'Color: Inverted',
  args: {
    color: 'inverted',
    shape: 'cross',
  },
};

export const ColorMuted: Story = {
  name: 'Color: Muted',
  args: {
    color: 'muted',
    shape: 'cross',
  },
};

export const ColorPrimary: Story = {
  name: 'Color: Primary',
  args: {
    color: 'primary',
    shape: 'cross',
  },
};

export const ColorRegular: Story = {
  name: 'Color: Regular',
  args: {
    color: 'regular',
    shape: 'cross',
  },
};

export const ColorSuccess: Story = {
  name: 'Color: Success',
  args: {
    color: 'success',
    shape: 'cross',
  },
};

export const ColorWarning: Story = {
  name: 'Color: Warning',
  args: {
    color: 'warning',
    shape: 'cross',
  },
};

export const SizeXS: Story = {
  name: 'Size: Extra-small',
  args: {
    shape: 'cross',
    size: 'xs',
  },
};

export const SizeSM: Story = {
  name: 'Size: Small',
  args: {
    shape: 'cross',
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: Medium',
  args: {
    shape: 'cross',
    size: 'md',
  },
};

export const SizeLG: Story = {
  name: 'Size: Large',
  args: {
    shape: 'cross',
    size: 'lg',
  },
};

export const SizeXL: Story = {
  name: 'Size: Extra-large',
  args: {
    shape: 'cross',
    size: 'xl',
  },
};
