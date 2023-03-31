import type { ShadowTokens } from '../../types/tokens';
import type {
  ShadowColors,
  ShadowLayer,
  ShadowLayers,
} from '../../types/utils';
import { getShadowTokens } from '../../utils/shadow';

const firstLayer: ShadowLayer = {
  offset: '0.2px',
  blur: '0.7px',
  spread: '0',
};

const secondLayer: ShadowLayer = {
  offset: '2.8px',
  blur: '3px',
  spread: '-0.4px',
};

const thirdLayer: ShadowLayer = {
  offset: '5.5px',
  blur: '6px',
  spread: '-0.8px',
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
  critical: 'hsla(5, 60%, 22%, 0.25)',
  info: 'hsla(182, 60%, 22%, 0.25)',
  inverted: 'hsla(0, 0%, 100%, 0.25)',
  muted: 'hsla(204, 7%, 35%, 0.25)',
  regular: 'hsla(204, 7%, 35%, 0.25)',
  success: 'hsla(116, 60%, 22%, 0.25)',
  warning: 'hsla(30, 60%, 22%, 0.25)',
};

const layers: ShadowLayers = {
  raised: [firstLayer, secondLayer, thirdLayer],
  elevated: [firstLayer, secondLayer, thirdLayer, fourthLayer],
  floating: [firstLayer, secondLayer, thirdLayer, fourthLayer, fifthLayer],
};

export const shadow: ShadowTokens = getShadowTokens(colors, layers);
