import { SkipTo, type SkipToProps } from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

export type SkipToContentProps = Omit<SkipToProps, 'label'>;

export const SkipToContent: FC<SkipToContentProps> = (props) => {
  const intl = useIntl();

  const label = intl.formatMessage({
    defaultMessage: 'Skip to content',
    id: 'fpBnkZ',
    description: 'SkipToContent: link label',
  });

  return <SkipTo {...props} label={label} />;
};
