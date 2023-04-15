import type { Meta, StoryObj } from '@storybook/react';
import { Img } from '../../atoms';
import { Branding } from './branding';

const meta = {
  title: 'Components/Molecules/Branding',
  component: Branding,
} satisfies Meta<typeof Branding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: 'A brand',
    to: '#homepage',
  },
};

export const WithLogo: Story = {
  args: {
    ...Default.args,
    logo: <Img alt="Branding logo" src="https://picsum.photos/640/480" />,
  },
};
