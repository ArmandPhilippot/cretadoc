import { type FC, type HTMLAttributes, type ReactNode, useId } from 'react';
import { Button, Icon } from '../../atoms';
import * as styles from './collapsible.css';

export type CollapsibleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  Required<Pick<HTMLAttributes<HTMLDivElement>, 'children'>> & {
    /**
     * Add an accessible name to the expand button.
     */
    expandBtnLabel?: string;
    /**
     * Should the expand button be dissociated from the summary?
     *
     * @default false
     */
    hasDissociatedBtn?: boolean;
    /**
     * Is the body expanded?
     *
     * @default false
     */
    isExpanded?: boolean;
    /**
     * A function to trigger on click on expand button.
     */
    onExpand?: () => void;
    /**
     * The collapsible summary.
     */
    summary: ReactNode;
  };

/**
 * Collapsible component.
 */
export const Collapsible: FC<CollapsibleProps> = ({
  children,
  className = '',
  expandBtnLabel,
  hasDissociatedBtn = false,
  isExpanded = false,
  onExpand,
  summary,
  ...props
}) => {
  const bodyClassName = styles.body({ isExpanded });
  const bodyId = useId();

  const expandIcon = (
    <Icon
      animationSpeed="fast"
      color="primary"
      orientation={isExpanded ? 'bottom' : 'right'}
      shape="angle"
      size="sm"
    />
  );

  return (
    <div {...props} className={`${styles.wrapper} ${className}`}>
      {hasDissociatedBtn ? (
        <div className={styles.summary}>
          {summary}
          <Button
            aria-controls={bodyId}
            aria-expanded={isExpanded}
            aria-label={expandBtnLabel}
            className={styles.btn({ isExpanded })}
            kind="neutral"
            onClick={onExpand}
          >
            {expandIcon}
          </Button>
        </div>
      ) : (
        <Button
          aria-controls={bodyId}
          aria-expanded={isExpanded}
          aria-label={expandBtnLabel}
          className={styles.summary}
          kind="neutral"
          onClick={onExpand}
        >
          {summary}
          {expandIcon}
        </Button>
      )}
      <div className={bodyClassName} id={bodyId}>
        {children}
      </div>
    </div>
  );
};
