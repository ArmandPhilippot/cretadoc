import {
  Heading,
  LinkProvider,
  type TableOfContentsProps as ToCProps,
  TableOfContents as ToC,
} from '@cretadoc/ui';
import type { FC } from 'react';
import { useIntl } from 'react-intl';

export type TableOfContentsProps = Omit<ToCProps, 'heading'>;

export const TableOfContents: FC<TableOfContentsProps> = (props) => {
  const intl = useIntl();
  const heading = intl.formatMessage({
    defaultMessage: 'On this page',
    description: 'TableOfContents: heading',
    id: '5RnjVF',
  });

  /*
   * We need to override the Link component since React Router does not handle
   * correctly the anchor links.
   */
  return (
    <LinkProvider value={null}>
      <ToC
        {...props}
        heading={
          <Heading isFake level={2}>
            {heading}
          </Heading>
        }
      />
    </LinkProvider>
  );
};
