import { type FC, type ReactNode, createContext, useMemo } from 'react';
import { DefaultLink } from './default-link';

export type UIComponents = {
  /**
   * Define a custom link component.
   */
  LinkComponent: typeof DefaultLink;
};

export type UIConfig = {
  /**
   * Define the custom components to use.
   */
  components: UIComponents;
};

const defaultComponents: UIComponents = { LinkComponent: DefaultLink };

export const UIContext = createContext<UIConfig>({
  components: defaultComponents,
});

export type UIProviderProps = Partial<UIConfig> & {
  /**
   * The components to wrap within the provider.
   */
  children: ReactNode;
};

/**
 * UI provider.
 *
 * It replaces some default components with yours.
 */
export const UIProvider: FC<UIProviderProps> = ({
  children,
  components = defaultComponents,
}) => {
  const config = useMemo<UIConfig>(() => {
    return { components };
  }, [components]);

  return <UIContext.Provider value={config}>{children}</UIContext.Provider>;
};
