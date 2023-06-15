import {
  Colophon as BaseColophon,
  type ColophonProps as BaseColophonProps,
  Link,
} from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { CRETADOC_REPOSITORY } from '../../utils/constants';
import { useConfig, usePage } from '../../utils/hooks';

export type ColophonProps = Omit<BaseColophonProps, 'copyright' | 'generator'>;

export const Colophon: FC<ColophonProps> = (props) => {
  const intl = useIntl();
  const { copyright, hideGenerator, pages } = useConfig();
  const { page: legalNotice } = usePage(
    pages.legalNotice ? { name: pages.legalNotice } : undefined
  );

  const generatorLink = intl.formatMessage(
    {
      defaultMessage: 'Built with {link}',
      id: 'OqHQ1o',
      description: 'Colophon: generator information',
    },
    {
      link: (
        <Link to={CRETADOC_REPOSITORY.link}>{CRETADOC_REPOSITORY.label}</Link>
      ),
    }
  );

  return (
    <BaseColophon
      {...props}
      copyright={copyright}
      generator={hideGenerator ? undefined : generatorLink}
      legalNotice={
        legalNotice
          ? { label: legalNotice.name, link: legalNotice.slug }
          : undefined
      }
    />
  );
};
