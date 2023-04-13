import { Decorator, Preview } from '@storybook/react';
import { themes } from '../src';
import * as styles from './styles.css';
import './themes.css';
import cretadoc from './themes/cretadoc';

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

const withGlobalDecorator: Decorator = (Story, context) => {
  const containerClassName = styles.container({
    fullscreen: context.parameters['layout'] === 'full' ? 'on' : 'off',
  });

  return (
    <div className={containerClassName} data-theme={context.globals['theme']}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withGlobalDecorator],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Switch the global theme for components',
      defaultValue: defaultTheme?.value,
      toolbar: {
        icon: 'paintbrush',
        items: customThemes,
        name: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: cretadoc,
    },
    layout: 'fullscreen',
    viewMode: 'docs',
  },
};

export default preview;
