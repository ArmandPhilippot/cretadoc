import type {
  ShadowColors,
  ShadowLayer,
  ShadowLayers,
  ShadowTokens,
} from '../../../types';
import { getShadowTokens } from '../../../utils/helpers';

const firstLayer: ShadowLayer = {
  offset: '0.2px',
  blur: '0.3px',
  spread: '0',
};

const secondLayer: ShadowLayer = {
  offset: '1.5px',
  blur: '2.5px',
  spread: '-0.3px',
};

const thirdLayer: ShadowLayer = {
  offset: '4.7px',
  blur: '8px',
  spread: '-0.9px',
};

const fourthLayer: ShadowLayer = {
  offset: '7.3px',
  blur: '11.3px',
  spread: '-1.1px',
};

const fifthLayer: ShadowLayer = {
  offset: '16.3px',
  blur: '22px',
  spread: '-2.1px',
};

const lightColors: ShadowColors = {
  critical: 'hsla(8, 75%, 22%, 0.25)',
  info: 'hsla(212, 75%, 22%, 0.25)',
  inverted: 'hsla(195, 15%, 8%, 0.25)',
  muted: 'hsla(195, 10%, 22%, 0.25)',
  regular: 'hsla(195, 15%, 22%, 0.25)',
  success: 'hsla(110, 75%, 22%, 0.25)',
  warning: 'hsla(35, 75%, 22%, 0.25)',
};

const darkColors: ShadowColors = {
  critical: 'hsla(8, 45%, 8%, 0.25)',
  info: 'hsla(212, 45%, 8%, 0.25)',
  inverted: 'hsla(195, 15%, 22%, 0.25)',
  muted: 'hsla(195, 10%, 8%, 0.25)',
  regular: 'hsla(195, 15%, 8%, 0.25)',
  success: 'hsla(110, 45%, 8%, 0.25)',
  warning: 'hsla(35, 45%, 8%, 0.25)',
};

const layers: ShadowLayers = {
  raised: [firstLayer, secondLayer, thirdLayer],
  elevated: [firstLayer, secondLayer, thirdLayer, fourthLayer],
  floating: [firstLayer, secondLayer, thirdLayer, fourthLayer, fifthLayer],
};

export const lightShadow: ShadowTokens = getShadowTokens(lightColors, layers);
export const darkShadow: ShadowTokens = getShadowTokens(darkColors, layers);
