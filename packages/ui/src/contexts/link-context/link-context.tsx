import type { Nullable } from '@cretadoc/utils';
import {
  type ForwardRefRenderFunction,
  forwardRef,
  createContext,
  type ReactNode,
  type FC,
  type ComponentType,
  type ForwardedRef,
} from 'react';
import type { LinkProps } from '../../components';

const DefaultLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkProps
> = ({ children, to, ...props }, ref) => (
  <a {...props} href={to} ref={ref}>
    {children}
  </a>
);

export type LinkContextValue = ComponentType<
  LinkProps & { ref?: ForwardedRef<HTMLAnchorElement> }
>;

/**
 * DefaultLink component.
 */
export const DefaultLink = forwardRef(DefaultLinkWithRef);

export const LinkContext = createContext<LinkContextValue>(DefaultLink);

export type LinkProviderProps = {
  /**
   * The components to wrap within the provider.
   */
  children: ReactNode;
  /**
   * The Link component to use.
   */
  value: Nullable<LinkContextValue>;
};

/**
 * Link provider.
 *
 * It replaces the default link component with your own link component.
 */
export const LinkProvider: FC<LinkProviderProps> = ({ children, value }) => (
  <LinkContext.Provider value={value ?? DefaultLink}>
    {children}
  </LinkContext.Provider>
);
