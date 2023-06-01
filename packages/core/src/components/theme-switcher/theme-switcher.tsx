import {
  type CretadocTheme,
  Switch,
  type SwitchItem,
  type SwitchProps,
  Icon,
  type IconProps,
} from '@cretadoc/ui';
import { type FC, useId } from 'react';
import { useIntl } from 'react-intl';
import type { CretadocThemes } from '../../types/config';

export type ThemeSwitcherProps = Omit<
  SwitchProps,
  'aria-label' | 'items' | 'name' | 'value'
> & {
  currentTheme: CretadocTheme;
  themes: CretadocThemes;
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  currentTheme,
  themes,
  onSwitch,
  ...props
}) => {
  const intl = useIntl();
  const switchName = useId();
  const iconSize: IconProps['size'] = 'xs';

  const darkThemeLabel = intl.formatMessage({
    defaultMessage: 'Dark theme',
    id: 'u07OwY',
    description: 'ThemeSwitcher: dark theme label',
  });

  const lightThemeLabel = intl.formatMessage({
    defaultMessage: 'Light theme',
    id: 'zysx+O',
    description: 'ThemeSwitcher: light theme label',
  });

  const options = [
    {
      'aria-label': lightThemeLabel,
      id: themes.light,
      // eslint-disable-next-line react/jsx-no-literals
      label: <Icon role="presentation" shape="sun" size={iconSize} />,
      value: themes.light,
    },
    {
      'aria-label': darkThemeLabel,
      id: themes.dark,
      // eslint-disable-next-line react/jsx-no-literals
      label: <Icon role="presentation" shape="moon" size={iconSize} />,
      value: themes.dark,
    },
  ] satisfies [SwitchItem, SwitchItem];

  const ariaLabel = intl.formatMessage({
    defaultMessage: 'Switch theme',
    id: 'fvPw3j',
    description: 'ThemeSwitcher: accessible label',
  });

  return (
    <Switch
      {...props}
      aria-label={ariaLabel}
      items={options}
      name={switchName}
      onSwitch={onSwitch}
      value={currentTheme}
    />
  );
};
