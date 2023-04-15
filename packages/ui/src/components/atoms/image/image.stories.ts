import type { Meta, StoryObj } from '@storybook/react';
import { Img } from './image';

const meta = {
  component: Img,
  title: 'Components/Atoms/Image',
  argTypes: {
    alt: {
      description: 'The alternative text of the image.',
      type: 'string',
    },
    src: {
      description: 'The source of the image.',
      type: 'string',
    },
  },
} satisfies Meta<typeof Img>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    alt: 'The alternative text',
    src: 'https://picsum.photos/640/480',
  },
};
