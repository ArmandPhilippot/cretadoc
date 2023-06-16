import { type FC, useContext } from 'react';
import { LinkContext } from './link-context';

type LinkContextConsumerProps = {
  children: string;
  to: string;
};

export const LinkContextConsumer: FC<LinkContextConsumerProps> = ({
  children,
  to,
}) => {
  const LinkComponent = useContext(LinkContext);

  return (
    <div>
      <LinkComponent to={to}>{children}</LinkComponent>
    </div>
  );
};
