import { assignInlineVars } from '@vanilla-extract/dynamic';
import type { FC, ReactNode } from 'react';
import { contract } from '../../../themes';
import type { FontSizeTokens } from '../../../types';
import {
  Description,
  DescriptionList,
  type DescriptionListProps,
  Group,
  Term,
} from '../../atoms';
import * as styles from './meta.css';

export type MetaItem = {
  id: string;
  label: string;
  value: ReactNode;
};

export type MetaProps = Omit<
  DescriptionListProps,
  'children' | 'isInline' | 'spacing'
> & {
  isInline?: boolean;
  items: MetaItem[];
  size?: Exclude<keyof FontSizeTokens, 'xs' | 'xl' | 'xxl'>;
};

export const Meta: FC<MetaProps> = ({
  className = '',
  isInline = false,
  items,
  size = 'md',
  style,
  ...props
}) => {
  const metaClassName = styles.meta({ isInline });
  const metaStyles = assignInlineVars({
    [styles.metaSize]: contract.font.size[size],
  });

  return (
    <DescriptionList
      {...props}
      className={`${metaClassName} ${className}`}
      isInline={isInline}
      spacing={isInline ? 'sm' : 'xxs'}
      style={{ ...metaStyles, ...style }}
    >
      {items.map((item) => (
        <Group
          className={styles.group}
          key={item.id}
          isInline={!isInline}
          spacing={isInline ? 'xxs' : undefined}
        >
          <Term className={styles.label} isBold={isInline}>
            {item.label}
          </Term>
          <Description>{item.value}</Description>
        </Group>
      ))}
    </DescriptionList>
  );
};
