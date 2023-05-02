import type { Meta, StoryObj } from '@storybook/react';
import { Color, PrimaryColor } from './components/color';
import { PreviewList } from './components/preview-list';

const meta: Meta = {
  title: 'Themes/Tokens/Colors',
  component: Color,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Background: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={3}>
      <Color token="color.background.critical" />
      <Color token="color.background.info" />
      <Color token="color.background.inverted.base" />
      <Color token="color.background.inverted.dark" />
      <Color token="color.background.inverted.light" />
      <Color token="color.background.muted" />
      <Color token="color.background.regular.base" />
      <Color token="color.background.regular.dark" />
      <Color token="color.background.regular.light" />
      <Color token="color.background.success" />
      <Color token="color.background.warning" />
    </PreviewList>
  ),
};

export const Border: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={3}>
      <Color token="color.borders.critical" />
      <Color token="color.borders.info" />
      <Color token="color.borders.inverted.base" />
      <Color token="color.borders.inverted.dark" />
      <Color token="color.borders.inverted.light" />
      <Color token="color.borders.muted" />
      <Color token="color.borders.regular.base" />
      <Color token="color.borders.regular.dark" />
      <Color token="color.borders.regular.light" />
      <Color token="color.borders.success" />
      <Color token="color.borders.warning" />
    </PreviewList>
  ),
};

export const Foreground: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={3}>
      <Color token="color.foreground.critical">Sample</Color>
      <Color token="color.foreground.info">Sample</Color>
      <Color token="color.foreground.muted">Sample</Color>
      <Color token="color.foreground.regular.base">Sample</Color>
      <Color token="color.foreground.regular.dark">Sample</Color>
      <Color token="color.foreground.regular.light">Sample</Color>
      <Color token="color.foreground.success">Sample</Color>
      <Color token="color.foreground.warning">Sample</Color>
    </PreviewList>
  ),
};

export const ForegroundOnBackground: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={3}>
      <Color token="color.foreground.onCritical">Sample</Color>
      <Color token="color.foreground.onInfo">Sample</Color>
      <Color token="color.foreground.onInverted.base">Sample</Color>
      <Color token="color.foreground.onInverted.dark">Sample</Color>
      <Color token="color.foreground.onInverted.light">Sample</Color>
      <Color token="color.foreground.onMuted">Sample</Color>
      <Color token="color.foreground.onPrimary.base">Sample</Color>
      <Color token="color.foreground.onPrimary.dark">Sample</Color>
      <Color token="color.foreground.onPrimary.light">Sample</Color>
      <Color token="color.foreground.onSuccess">Sample</Color>
      <Color token="color.foreground.onWarning">Sample</Color>
    </PreviewList>
  ),
};

export const Primary: StoryObj = {
  args: {},
  render: () => (
    <PreviewList itemsPerRow={3}>
      <PrimaryColor context="foreground" token="color.primary.base">
        Sample
      </PrimaryColor>
      <PrimaryColor context="foreground" token="color.primary.dark">
        Sample
      </PrimaryColor>
      <PrimaryColor context="foreground" token="color.primary.light">
        Sample
      </PrimaryColor>
      <PrimaryColor context="background" token="color.primary.base" />
      <PrimaryColor context="background" token="color.primary.dark" />
      <PrimaryColor context="background" token="color.primary.light" />
      <PrimaryColor context="borders" token="color.primary.base" />
      <PrimaryColor context="borders" token="color.primary.dark" />
      <PrimaryColor context="borders" token="color.primary.light" />
    </PreviewList>
  ),
};
