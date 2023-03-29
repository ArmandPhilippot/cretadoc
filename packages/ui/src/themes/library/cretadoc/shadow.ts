import type { ShadowTokens } from '../../types/tokens';
import type {
  ShadowColors,
  ShadowLayer,
  ShadowLayers,
} from '../../types/utils';
import { getShadowTokens } from '../../utils/shadow';

const firstLayer: ShadowLayer = {
  offset: '0.5px',
  blur: '0.6px',
  spread: '0',
};

const secondLayer: ShadowLayer = {
  offset: '3.1px',
  blur: '3.5px',
  spread: '-0.4px',
};

const thirdLayer: ShadowLayer = {
  offset: '5.7px',
  blur: '6.4px',
  spread: '-0.7px',
};

const fourthLayer: ShadowLayer = {
  offset: '9.4px',
  blur: '10.6px',
  spread: '-1.1px',
};

const fifthLayer: ShadowLayer = {
  offset: '15.1px',
  blur: '17px',
  spread: '-1.4px',
};

const colors: ShadowColors = {
  critical: 'hsla(7, 32%, 79%, 0.5)',
  info: 'hsla(204, 39%, 76%, 0.5)',
  inverted: 'hsla(203, 16%, 81%, 0.5)',
  muted: 'hsla(202, 6%, 66%, 0.5)',
  regular: 'hsla(200, 5%, 44%, 0.5)',
  success: 'hsla(128, 39%, 75%, 0.5)',
  warning: 'hsla(44, 33%, 77%, 0.5)',
};

const layers: ShadowLayers = {
  raised: [firstLayer, secondLayer, thirdLayer],
  elevated: [firstLayer, secondLayer, thirdLayer, fourthLayer],
  floating: [firstLayer, secondLayer, thirdLayer, fourthLayer, fifthLayer],
};

export const shadow: ShadowTokens = getShadowTokens(colors, layers);
