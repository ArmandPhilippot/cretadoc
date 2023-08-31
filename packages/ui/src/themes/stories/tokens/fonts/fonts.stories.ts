import type { Meta, StoryObj } from '@storybook/react';
import { FontsPreview } from './fonts';

const meta = {
  title: 'Themes/Tokens/Fonts',
  component: FontsPreview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FontsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Family: Story = {
  args: {
    isInline: true,
    sample: 'The quick brown fox jumps over a lazy dog.',
    tokens: ['font.family.monospace', 'font.family.regular'],
  },
};

export const Size: Story = {
  args: {
    isInline: true,
    sample: 'The quick brown fox jumps over a lazy dog.',
    tokens: [
      'font.size.xs',
      'font.size.sm',
      'font.size.md',
      'font.size.lg',
      'font.size.xl',
      'font.size.xxl',
    ],
  },
};

export const Weight: Story = {
  args: {
    isInline: true,
    sample: 'The quick brown fox jumps over a lazy dog.',
    tokens: ['font.weight.light', 'font.weight.regular', 'font.weight.strong'],
  },
};

export const LetterSpacing: Story = {
  args: {
    isInline: true,
    sample: 'The quick brown fox jumps over a lazy dog.',
    tokens: [
      'font.letterSpacing.narrow',
      'font.letterSpacing.regular',
      'font.letterSpacing.spaced',
    ],
  },
};

export const LineHeight: Story = {
  args: {
    sample:
      'Eos aut corrupti autem ut quia voluptatibus id adipisci est. Qui consequuntur distinctio modi quaerat ea non cumque. Libero eos reiciendis nostrum. Inventore nesciunt dolor odit. Voluptatibus veniam totam tempore praesentium nihil consequuntur voluptatem non sed. Accusantium doloremque exercitationem veritatis est. Animi a at nisi. Explicabo laboriosam aut aliquam. Odit fugiat quia facere numquam excepturi voluptas. Ut sunt quibusdam non natus consequatur qui.',
    tokens: ['font.lineHeight.sm', 'font.lineHeight.md', 'font.lineHeight.lg'],
  },
};
