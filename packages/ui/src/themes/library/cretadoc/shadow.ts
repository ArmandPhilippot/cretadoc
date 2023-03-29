import type { Color, Length } from '../../types/css';
import type { ShadowTokens } from '../../types/tokens';

const CRITICAL_COLOR = 'hsla(7, 32%, 79%, 0.5)';
const INFO_COLOR = 'hsla(204, 39%, 76%, 0.5)';
const INVERTED_COLOR = 'hsla(203, 16%, 81%, 0.5)';
const MUTED_COLOR = 'hsla(202, 6%, 66%, 0.5)';
const REGULAR_COLOR = 'hsla(200, 5%, 44%, 0.5)';
const SUCCESS_COLOR = 'hsla(128, 39%, 75%, 0.5)';
const WARNING_COLOR = 'hsla(44, 33%, 77%, 0.5)';

type Layer = {
  offset: Length;
  blur: Length;
  spread: Length;
};

const FIRST_LAYER = {
  offset: '0.5px',
  blur: '0.6px',
  spread: '0',
} as const;

const SECOND_LAYER = {
  offset: '3.1px',
  blur: '3.5px',
  spread: '-0.4px',
} as const;

const THIRD_LAYER = {
  offset: '5.7px',
  blur: '6.4px',
  spread: '-0.7px',
} as const;

const FOURTH_LAYER = {
  offset: '9.4px',
  blur: '10.6px',
  spread: '-1.1px',
} as const;

const FIFTH_LAYER = {
  offset: '15.1px',
  blur: '17px',
  spread: '-1.4px',
} as const;

const buildLayer = (layer: Layer, color: Color) =>
  `${layer.offset} ${layer.offset} ${layer.blur} ${layer.spread} ${color}`;

const getLayers = (color: Color) => {
  return {
    raised: [FIRST_LAYER, SECOND_LAYER, THIRD_LAYER]
      .map((layer) => buildLayer(layer, color))
      .join(', '),
    elevated: [FIRST_LAYER, SECOND_LAYER, THIRD_LAYER, FOURTH_LAYER]
      .map((layer) => buildLayer(layer, color))
      .join(', '),
    floating: [
      FIRST_LAYER,
      SECOND_LAYER,
      THIRD_LAYER,
      FOURTH_LAYER,
      FIFTH_LAYER,
    ]
      .map((layer) => buildLayer(layer, color))
      .join(', '),
  };
};

export const shadow: ShadowTokens = {
  critical: {
    bottom: {
      center: getLayers(CRITICAL_COLOR),
      left: getLayers(CRITICAL_COLOR),
      right: getLayers(CRITICAL_COLOR),
    },
    top: {
      center: getLayers(CRITICAL_COLOR),
      left: getLayers(CRITICAL_COLOR),
      right: getLayers(CRITICAL_COLOR),
    },
  },
  info: {
    bottom: {
      center: getLayers(INFO_COLOR),
      left: getLayers(INFO_COLOR),
      right: getLayers(INFO_COLOR),
    },
    top: {
      center: getLayers(INFO_COLOR),
      left: getLayers(INFO_COLOR),
      right: getLayers(INFO_COLOR),
    },
  },
  inverted: {
    bottom: {
      center: getLayers(INVERTED_COLOR),
      left: getLayers(INVERTED_COLOR),
      right: getLayers(INVERTED_COLOR),
    },
    top: {
      center: getLayers(INVERTED_COLOR),
      left: getLayers(INVERTED_COLOR),
      right: getLayers(INVERTED_COLOR),
    },
  },
  muted: {
    bottom: {
      center: getLayers(MUTED_COLOR),
      left: getLayers(MUTED_COLOR),
      right: getLayers(MUTED_COLOR),
    },
    top: {
      center: getLayers(MUTED_COLOR),
      left: getLayers(MUTED_COLOR),
      right: getLayers(MUTED_COLOR),
    },
  },
  regular: {
    bottom: {
      center: getLayers(REGULAR_COLOR),
      left: getLayers(REGULAR_COLOR),
      right: getLayers(REGULAR_COLOR),
    },
    top: {
      center: getLayers(REGULAR_COLOR),
      left: getLayers(REGULAR_COLOR),
      right: getLayers(REGULAR_COLOR),
    },
  },
  success: {
    bottom: {
      center: getLayers(SUCCESS_COLOR),
      left: getLayers(SUCCESS_COLOR),
      right: getLayers(SUCCESS_COLOR),
    },
    top: {
      center: getLayers(SUCCESS_COLOR),
      left: getLayers(SUCCESS_COLOR),
      right: getLayers(SUCCESS_COLOR),
    },
  },
  warning: {
    bottom: {
      center: getLayers(WARNING_COLOR),
      left: getLayers(WARNING_COLOR),
      right: getLayers(WARNING_COLOR),
    },
    top: {
      center: getLayers(WARNING_COLOR),
      left: getLayers(WARNING_COLOR),
      right: getLayers(WARNING_COLOR),
    },
  },
};
