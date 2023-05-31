import {
  BackToTop as BackTo,
  useScrollPosition,
  type BackToTopProps as BackToProps,
} from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

export type BackToTopProps = Omit<BackToProps, 'label'>;

export const BackToTop: FC<BackToTopProps> = (props) => {
  const intl = useIntl();
  const minScrollLength = 50;
  const { y: scrollPosition } = useScrollPosition();

  const label = intl.formatMessage({
    defaultMessage: 'Back to top',
    id: 'a10l60',
    description: 'BackToTop: button accessible label',
  });

  return (
    <BackTo
      {...props}
      isVisible={scrollPosition > minScrollLength}
      label={label}
    />
  );
};
