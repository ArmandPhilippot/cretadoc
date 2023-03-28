import type { KeyPathIn } from '@cretadoc/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  type ChangeEvent,
  type FC,
  type HTMLAttributes,
  useState,
  useCallback,
  type FormEvent,
  type MouseEventHandler,
  useId,
} from 'react';
import { contract } from '../../contract';
import { getContractValueFrom } from '../../utils/helpers';
import * as styles from './animation.css';
import { Preview } from './preview';

type OptionsProps = {
  id: string;
  label: string;
  value: string;
};

/**
 * Option component.
 */
const SelectOption: FC<OptionsProps> = ({ id, label, value }) => (
  <option id={id} value={value}>
    {label}
  </option>
);

type SelectProps = Omit<HTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  options: OptionsProps[];
  value: OptionsProps['value'];
};

/**
 * Select component.
 */
const Select: FC<SelectProps> = ({ label, options, value, ...props }) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select {...props} id={id} value={value}>
        {options.map((option) => (
          <SelectOption key={option.id} {...option} />
        ))}
      </select>
    </>
  );
};

type AnimationKind = 'rotate' | 'slide';

type LabelledSelectProps = Pick<SelectProps, 'onChange'> & {
  value: string;
};

/**
 * A labelled Select component to choose an animation.
 */
const SelectAnimation: FC<LabelledSelectProps> = ({ ...props }) => {
  const label = 'Animation';
  const options: OptionsProps[] = [
    { id: 'rotate', label: 'Rotate', value: 'rotate' },
    { id: 'slide', label: 'Slide in', value: 'slide' },
  ];

  return <Select {...props} label={label} options={options} />;
};

/**
 * A labelled Select component to choose a duration.
 */
const SelectDuration: FC<LabelledSelectProps> = ({ ...props }) => {
  const label = 'Duration';
  const options: OptionsProps[] = Object.keys(contract.animation.duration).map(
    (key) => {
      const token = `animation.duration.${key}`;

      return { id: token, label: token, value: token };
    }
  );

  return <Select {...props} label={label} options={options} />;
};

/**
 * A labelled Select component to choose a timing function.
 */
const SelectTimingFunction: FC<LabelledSelectProps> = ({ ...props }) => {
  const label = 'Timing function';
  const options: OptionsProps[] = Object.keys(contract.animation.timing).map(
    (key) => {
      const token = `animation.timing.${key}`;

      return { id: token, label: token, value: token };
    }
  );

  return <Select {...props} label={label} options={options} />;
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
    <button onClick={onClick} type="button">
      {value === 'paused' ? pausedLabel : runningLabel}
    </button>
  );
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

type InfiniteAnimationProps = {
  /**
   * Define the default animation.
   *
   * @default 'slide'
   */
  animation?: AnimationKind;
  /**
   * A token starting with `animation.duration`.
   *
   * @default 'animation.duration.medium'
   */
  duration?: KeyPathIn<typeof contract, 'animation'>;
  /**
   * Should the animation be running or paused?
   *
   * @default 'running'
   */
  playState?: PlayState;
  /**
   * A token starting with `animation.timing`.
   *
   * @default 'animation.timing.linear'
   */
  timingFunction?: KeyPathIn<typeof contract, 'animation'>;
};

/**
 * InfiniteAnimation component
 *
 * Use it to show a preview of an animation using any animation token.
 */
export const InfiniteAnimation: FC<InfiniteAnimationProps> = ({
  animation = 'slide',
  duration = 'animation.duration.medium',
  playState = 'running',
  timingFunction = 'animation.timing.linear',
}) => {
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationKind>(animation);

  const [currentDuration, setCurrentDuration] =
    useState<KeyPathIn<typeof contract>>(duration);

  const [currentPlayState, setCurrentPlayState] =
    useState<PlayState>(playState);

  const [currentTimingFunction, setCurrentTimingFunction] =
    useState<KeyPathIn<typeof contract>>(timingFunction);

  const previewStyles = assignInlineVars({
    [styles.animationName]:
      currentAnimation === 'rotate' ? styles.rotate : styles.slideIn,
    [styles.duration]: getContractValueFrom(currentDuration),
    [styles.playState]: currentPlayState,
    [styles.timing]: getContractValueFrom(currentTimingFunction),
  });

  const updateAnimation = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'slide' || e.target.value === 'rotate')
      setCurrentAnimation(e.target.value);
  }, []);

  const updateDuration = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentDuration(e.target.value as KeyPathIn<typeof contract>);
  }, []);

  const updatePlayState = useCallback(() => {
    setCurrentPlayState((prevState) => {
      if (prevState === 'paused') return 'running';
      return 'paused';
    });
  }, []);

  const updateTimingFunction = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentTimingFunction(e.target.value as KeyPathIn<typeof contract>);
    },
    []
  );

  return (
    <Preview className={styles.animationPreview} style={previewStyles}>
      <div className={styles.boxWrapper}>
        <div className={styles.animatedBox} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectAnimation onChange={updateAnimation} value={currentAnimation} />
        <SelectDuration onChange={updateDuration} value={currentDuration} />
        <SelectTimingFunction
          onChange={updateTimingFunction}
          value={currentTimingFunction}
        />
        <PlayStateBtn onClick={updatePlayState} value={currentPlayState} />
      </form>
    </Preview>
  );
};

type TransitionProps = {
  /**
   * A token starting with `animation.duration`.
   *
   * @default 'animation.duration.medium'
   */
  duration?: KeyPathIn<typeof contract, 'animation'>;
  /**
   * A token starting with `animation.timing`.
   *
   * @default 'animation.timing.linear'
   */
  timingFunction?: KeyPathIn<typeof contract, 'animation'>;
};

/**
 * Transition component
 *
 * Use it to show a preview of a transition using any animation token.
 */
export const Transition: FC<TransitionProps> = ({
  duration = 'animation.duration.medium',
  timingFunction = 'animation.timing.linear',
}) => {
  const body = 'Hover me to see the transition.';

  const [currentDuration, setCurrentDuration] =
    useState<KeyPathIn<typeof contract>>(duration);

  const [currentTimingFunction, setCurrentTimingFunction] =
    useState<KeyPathIn<typeof contract>>(timingFunction);

  const updateDuration = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentDuration(e.target.value as KeyPathIn<typeof contract>);
  }, []);

  const updateTimingFunction = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentTimingFunction(e.target.value as KeyPathIn<typeof contract>);
    },
    []
  );

  const previewStyles = assignInlineVars({
    [styles.duration]: getContractValueFrom(currentDuration),
    [styles.timing]: getContractValueFrom(currentTimingFunction),
  });

  return (
    <Preview className={styles.animationPreview} style={previewStyles}>
      <div className={styles.boxWrapper}>
        <div className={styles.transitionedBox}>{body}</div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectDuration onChange={updateDuration} value={currentDuration} />
        <SelectTimingFunction
          onChange={updateTimingFunction}
          value={currentTimingFunction}
        />
      </form>
    </Preview>
  );
};
