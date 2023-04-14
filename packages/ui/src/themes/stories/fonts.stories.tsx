import type { Meta, StoryObj } from '@storybook/react';
import { Font } from './components/font';
import { PreviewList } from './components/preview-list';

const meta: Meta = {
  title: 'Themes/Tokens/Fonts',
  component: Font,
  parameters: {
    layout: 'full',
  },
};

export default meta;

export const Family: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Font orientation="inline" token="font.family.regular">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.family.monospace">
        The quick brown fox jumps over a lazy dog.
      </Font>
    </PreviewList>
  ),
};

export const Size: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Font orientation="inline" token="font.size.xs">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.size.sm">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.size.md">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.size.lg">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.size.xl">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.size.xxl">
        The quick brown fox jumps over a lazy dog.
      </Font>
    </PreviewList>
  ),
};

export const Weight: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Font orientation="inline" token="font.weight.light">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.weight.regular">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.weight.strong">
        The quick brown fox jumps over a lazy dog.
      </Font>
    </PreviewList>
  ),
};

export const LetterSpacing: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Font orientation="inline" token="font.letterSpacing.narrow">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.letterSpacing.regular">
        The quick brown fox jumps over a lazy dog.
      </Font>
      <Font orientation="inline" token="font.letterSpacing.spaced">
        The quick brown fox jumps over a lazy dog.
      </Font>
    </PreviewList>
  ),
};

export const LineHeight: StoryObj = {
  args: {},
  render: () => (
    <PreviewList>
      <Font token="font.lineHeight.sm">
        Eos aut corrupti autem ut quia voluptatibus id adipisci est. Qui
        consequuntur distinctio modi quaerat ea non cumque. Libero eos
        reiciendis nostrum. Inventore nesciunt dolor odit. Voluptatibus veniam
        totam tempore praesentium nihil consequuntur voluptatem non sed.
        Accusantium doloremque exercitationem veritatis est. Animi a at nisi.
        Explicabo laboriosam aut aliquam. Odit fugiat quia facere numquam
        excepturi voluptas. Ut sunt quibusdam non natus consequatur qui.
      </Font>
      <Font token="font.lineHeight.md">
        Eos aut corrupti autem ut quia voluptatibus id adipisci est. Qui
        consequuntur distinctio modi quaerat ea non cumque. Libero eos
        reiciendis nostrum. Inventore nesciunt dolor odit. Voluptatibus veniam
        totam tempore praesentium nihil consequuntur voluptatem non sed.
        Accusantium doloremque exercitationem veritatis est. Animi a at nisi.
        Explicabo laboriosam aut aliquam. Odit fugiat quia facere numquam
        excepturi voluptas. Ut sunt quibusdam non natus consequatur qui.
      </Font>
      <Font token="font.lineHeight.lg">
        Eos aut corrupti autem ut quia voluptatibus id adipisci est. Qui
        consequuntur distinctio modi quaerat ea non cumque. Libero eos
        reiciendis nostrum. Inventore nesciunt dolor odit. Voluptatibus veniam
        totam tempore praesentium nihil consequuntur voluptatem non sed.
        Accusantium doloremque exercitationem veritatis est. Animi a at nisi.
        Explicabo laboriosam aut aliquam. Odit fugiat quia facere numquam
        excepturi voluptas. Ut sunt quibusdam non natus consequatur qui.
      </Font>
    </PreviewList>
  ),
};
