import { type FC, type ForwardRefRenderFunction, forwardRef } from 'react';
import type { LinkProps } from '../atoms';
import { UIContext } from './context';
import { useComponentsFrom } from './hooks';

type TestingComponentProps = {
  children: string;
  to: string;
};

export const TestingComponent: FC<TestingComponentProps> = ({
  children,
  to,
}) => {
  const { LinkComponent } = useComponentsFrom(UIContext);

  return <LinkComponent to={to}>{children}</LinkComponent>;
};

const CustomLinkWithRef: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkProps
> = ({ children, to }, ref) => (
  <a href={to} ref={ref}>
    {children}
  </a>
);

export const CustomLink = forwardRef(CustomLinkWithRef);
