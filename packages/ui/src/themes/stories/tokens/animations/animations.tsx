import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  type ChangeEvent,
  type FC,
  useState,
  useCallback,
  type FormEvent,
  type MouseEventHandler,
  type ReactNode,
  useId,
} from 'react';
import {
  Button,
  LabelledField,
  Select,
  type SelectOption,
  type SelectProps,
} from '../../../../components';
import { useToggle } from '../../../../hooks';
import { getKeyPathValue } from '../../../../utils/helpers';
import { Preview, PreviewList } from '../../../../utils/stories';
import { contract } from '../../../contract';
import * as styles from './animations.css';

type BoxProps = {
  children?: ReactNode;
  context: 'animation' | 'transition';
};

const Box: FC<BoxProps> = ({ children, context }) => {
  const className =
    context === 'animation' ? styles.animatedBox : styles.transitionedBox;

  return (
    <div className={styles.boxWrapper}>
      <div className={className}>{children}</div>
    </div>
  );
};

type SettingsProps = {
  /**
   * The fields.
   */
  children: ReactNode;
};

const Settings: FC<SettingsProps> = ({ children }) => {
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

type AnimationKind = 'rotate' | 'slide';

type SelectSettingsProp = Required<Pick<SelectProps<false>, 'onChange'>> & {
  value: string;
};

/**
 * A component to select an animation kind.
 */
const AnimationSettings: FC<SelectSettingsProp> = ({ value, ...props }) => {
  const id = useId();
  const label = 'Animation';
  const options: SelectOption[] = [
    { label: 'Rotate', value: 'rotate' },
    { label: 'Slide in', value: 'slide' },
  ];

  return (
    <LabelledField
      field={
        <Select
          {...props}
          defaultValue={value}
          id={id}
          options={options}
          value={value}
        />
      }
      label={label}
    />
  );
};

/**
 * A labelled Select component to choose a duration.
 */
const DurationSettings: FC<SelectSettingsProp> = ({ value, ...props }) => {
  const id = useId();
  const label = 'Duration';
  const options: SelectOption[] = Object.keys(contract.animation.duration).map(
    (key) => {
      const token = `animation.duration.${key}`;

      return { label: token, value: token };
    }
  );

  return (
    <LabelledField
      field={
        <Select
          {...props}
          defaultValue={value}
          id={id}
          options={options}
          value={value}
        />
      }
      label={label}
    />
  );
};

/**
 * A labelled Select component to choose a timing function.
 */
const TimingFunctionSettings: FC<SelectSettingsProp> = ({
  value,
  ...props
}) => {
  const id = useId();
  const label = 'Timing function';
  const options: SelectOption[] = Object.keys(contract.animation.timing).map(
    (key) => {
      const token = `animation.timing.${key}`;

      return { label: token, value: token };
    }
  );

  return (
    <LabelledField
      field={
        <Select
          {...props}
          defaultValue={value}
          id={id}
          options={options}
          value={value}
        />
      }
      label={label}
    />
  );
};

type PlayState = 'paused' | 'running';

type PlayStateBtnProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  value: PlayState;
};

/**
 * A button to start/stop the animation.
 */
const PlayStateBtn: FC<PlayStateBtnProps> = ({ onClick, value }) => {
  const runningLabel = 'Paused';
  const pausedLabel = 'Run';

  return (
    <Button className={styles.btn} onClick={onClick}>
      {value === 'paused' ? pausedLabel : runningLabel}
    </Button>
  );
};

const isValidAnimation = (value: string): value is AnimationKind =>
  value === 'rotate' || value === 'slide';

type AnimationPreviewProps = {
  animation?: AnimationKind;
  duration: KeyPathIn<(typeof contract)['animation']['duration']>;
  timingFunction: KeyPathIn<(typeof contract)['animation']['timing']>;
};

type CurrentAnimation = {
  animation: AnimationKind;
  duration: KeyPathIn<typeof contract>;
  timingFunction: KeyPathIn<typeof contract>;
};

export const AnimationPreview: FC<AnimationPreviewProps> = ({
  animation,
  duration,
  timingFunction,
}) => {
  const isAnimation = !!animation;
  const body = isAnimation ? '' : 'Hover me to see the transition.';
  const [isRunning, togglePlayState] = useToggle(false);
  const playState = isRunning ? 'running' : 'paused';
  const [currentAnimation, setCurrentAnimation] = useState<CurrentAnimation>({
    animation: animation ?? 'slide',
    duration: `animation.duration.${duration}`,
    timingFunction: `animation.timing.${timingFunction}`,
  });

  const updateAnimation = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (isValidAnimation(value))
      setCurrentAnimation((prev) => {
        return { ...prev, animation: value };
      });
  }, []);

  const updateDuration = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentAnimation((prev) => {
      return {
        ...prev,
        duration: e.target.value as KeyPathIn<typeof contract>,
      };
    });
  }, []);

  const updateTimingFunction = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentAnimation((prev) => {
        return {
          ...prev,
          timingFunction: e.target.value as KeyPathIn<typeof contract>,
        };
      });
    },
    []
  );

  const previewStyles = assignInlineVars({
    [styles.animationName]:
      currentAnimation.animation === 'rotate' ? styles.rotate : styles.slideIn,
    [styles.duration]: getKeyPathValue(contract, currentAnimation.duration),
    [styles.playState]: playState,
    [styles.timing]: getKeyPathValue(contract, currentAnimation.timingFunction),
  });

  return (
    <PreviewList>
      <Preview style={previewStyles}>
        <Box context={isAnimation ? 'animation' : 'transition'}>{body}</Box>
        <Settings>
          {isAnimation ? (
            <AnimationSettings
              onChange={updateAnimation}
              value={currentAnimation.animation}
            />
          ) : null}
          <DurationSettings
            onChange={updateDuration}
            value={currentAnimation.duration}
          />
          <TimingFunctionSettings
            onChange={updateTimingFunction}
            value={currentAnimation.timingFunction}
          />
          {isAnimation ? (
            <PlayStateBtn onClick={togglePlayState} value={playState} />
          ) : null}
        </Settings>
      </Preview>
    </PreviewList>
  );
};
