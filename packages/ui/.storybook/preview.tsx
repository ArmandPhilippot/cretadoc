import { DecoratorFn } from '@storybook/react';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { themes } from '../src';
import './themes.css';

const customThemes = Object.values(themes).map((theme) => {
  return {
    title: theme.name,
    value: theme.id,
  };
});

const defaultThemeId = 'cretadoc-light';
const defaultTheme =
  customThemes.find((theme) => theme.value === defaultThemeId) ??
  customThemes[0];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch theme',
    defaultValue: defaultTheme?.value,
    toolbar: {
      icon: 'paintbrush',
      items: customThemes,
      name: true,
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  viewMode: 'docs',
};

export const withGlobalDecorator: DecoratorFunction<StoryFnReactReturnType> = (
  Story,
  context
) => {
  return (
    <div data-theme={context.globals['theme']}>
      <Story />
    </div>
  );
};

export const decorators: DecoratorFn[] = [withGlobalDecorator];
