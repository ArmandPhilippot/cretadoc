import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useId,
  type ReactElement,
} from 'react';
import { Button, type IconProps } from '../../atoms';
import * as styles from './collapsible.css';

export type CollapsibleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> &
  Required<Pick<HTMLAttributes<HTMLDivElement>, 'children'>> & {
    /**
     * Provide additional styles to the body wrapper.
     */
    bodyClassName?: string;
    /**
     * Provide additional styles to the expand button.
     */
    expandBtnClassName?: string;
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
     * An icon to represent the current state.
     */
    icon: ReactElement<IconProps>;
    /**
     * Are the details visible?
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
    /**
     * Provide additional styles to the summary wrapper.
     */
    summaryClassName?: string;
  };

/**
 * Collapsible component.
 */
export const Collapsible: FC<CollapsibleProps> = ({
  bodyClassName = '',
  children,
  className = '',
  expandBtnClassName = '',
  expandBtnLabel,
  hasDissociatedBtn = false,
  icon,
  isExpanded = false,
  onExpand,
  summary,
  summaryClassName = '',
  ...props
}) => {
  const wrapperClassName = styles.wrapper({ isExpanded });
  const btnClassName = styles.btn({ isFullWidth: !hasDissociatedBtn });
  const bodyId = useId();

  return (
    <div {...props} className={`${wrapperClassName} ${className}`}>
      <div className={`${styles.summary} ${summaryClassName}`}>
        {hasDissociatedBtn ? (
          <>
            {summary}
            <Button
              aria-controls={bodyId}
              aria-expanded={isExpanded}
              aria-label={expandBtnLabel}
              className={`${btnClassName} ${expandBtnClassName}`}
              kind="neutral"
              onClick={onExpand}
            >
              {icon}
            </Button>
          </>
        ) : (
          <Button
            aria-controls={bodyId}
            aria-expanded={isExpanded}
            aria-label={expandBtnLabel}
            className={`${btnClassName} ${expandBtnClassName}`}
            kind="neutral"
            onClick={onExpand}
          >
            {summary}
            {icon}
          </Button>
        )}
      </div>
      <div className={`${styles.body} ${bodyClassName}`} id={bodyId}>
        {children}
      </div>
    </div>
  );
};
