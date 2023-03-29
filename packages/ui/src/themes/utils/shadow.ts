import type { Color, Length } from '../types/css';
import type {
  ShadowXAxisTokens,
  ShadowYAxisTokens,
  ShadowElevationTokens,
  ShadowTokens,
} from '../types/tokens';
import type {
  ShadowColors,
  ShadowDirection,
  ShadowLayer,
  ShadowLayers,
} from '../types/utils';

/**
 * Get the shadow offset on X axis depending on the given direction.
 *
 * @param {keyof ShadowXAxisTokens} direction - The shadow direction on X axis
 * @param {Length} offset - A positive offset.
 * @returns {string} The offset-x value.
 */
const getOffsetX = (
  direction: keyof ShadowXAxisTokens,
  offset: Length
): string => {
  switch (direction) {
    case 'center':
      return '0';
    case 'left':
      return `-${offset}`;
    case 'right':
    default:
      return offset;
  }
};

/**
 * Get the shadow offset on Y axis depending on the given direction.
 *
 * @param {keyof ShadowYAxisTokens} direction - The shadow direction on Y axis
 * @param {Length} offset - A positive offset.
 * @returns {string} The offset-y value.
 */
const getOffsetY = (
  direction: keyof ShadowYAxisTokens,
  offset: Length
): string => {
  if (direction === 'bottom') return offset;
  return `-${offset}`;
};

type BuildLayerConfig = {
  color: Color;
  direction: ShadowDirection;
  layer: ShadowLayer;
};

/**
 * Build a shadow layer.
 *
 * @param {BuildLayerConfig} config - The config to build a layer.
 * @returns {string} The layer.
 */
const buildLayer = ({ color, direction, layer }: BuildLayerConfig): string => {
  const offsetX = getOffsetX(direction.x, layer.offset);
  const offsetY = getOffsetY(direction.y, layer.offset);

  return `${offsetX} ${offsetY} ${layer.blur} ${layer.spread} ${color}`;
};

type BuildShadowConfig = {
  color: Color;
  direction: ShadowDirection;
  layers: ShadowLayer[];
};

/**
 * Build a shadow using the given layers.
 *
 * @param {BuildShadowConfig} config - The config to build a shadow.
 * @returns {string} The shadow.
 */
export const buildShadow = ({
  color,
  direction,
  layers,
}: BuildShadowConfig): string => {
  const shadowLayers = layers.map((layer) =>
    buildLayer({ color, direction, layer })
  );

  return shadowLayers.join(', ');
};

type GetElevationTokensConfig = {
  color: Color;
  direction: ShadowDirection;
  layers: ShadowLayers;
};

/**
 * Retrieve the shadows for each elevation token.
 *
 * @param {GetElevationTokensConfig} config - The config to build the shadows.
 * @returns {ShadowElevationTokens} The elevation tokens.
 */
const getShadowElevationTokens = ({
  color,
  direction,
  layers,
}: GetElevationTokensConfig): ShadowElevationTokens => {
  const elevations: Array<keyof ShadowElevationTokens> = [
    'elevated',
    'floating',
    'raised',
  ];

  return Object.fromEntries(
    elevations.map((elevation) => [
      elevation,
      buildShadow({ color, direction, layers: layers[elevation] }),
    ])
  ) as ShadowElevationTokens;
};

type GetShadowXAxisTokensConfig = {
  color: Color;
  layers: ShadowLayers;
  y: ShadowDirection['y'];
};

/**
 * Retrieve the shadows on X axis.
 *
 * @param {GetShadowXAxisTokensConfig} config - The config to build the shadows.
 * @returns {ShadowXAxisTokens} The X axis tokens.
 */
const getShadowXAxisTokens = ({
  color,
  layers,
  y,
}: GetShadowXAxisTokensConfig): ShadowXAxisTokens => {
  const xDirections: Array<ShadowDirection['x']> = ['center', 'left', 'right'];

  return Object.fromEntries(
    xDirections.map((x) => {
      const direction = { x, y };

      return [x, getShadowElevationTokens({ color, direction, layers })];
    })
  ) as ShadowXAxisTokens;
};

type GetShadowYAxisTokensConfig = {
  color: Color;
  layers: ShadowLayers;
};

/**
 * Retrieve the shadows on Y axis.
 *
 * @param {GetShadowYAxisTokensConfig} config - The config to build the shadows.
 * @returns {ShadowYAxisTokens} The Y axis tokens.
 */
const getShadowYAxisTokens = ({
  color,
  layers,
}: GetShadowYAxisTokensConfig): ShadowYAxisTokens => {
  const yDirections: Array<ShadowDirection['y']> = ['bottom', 'top'];

  return Object.fromEntries(
    yDirections.map((y) => [y, getShadowXAxisTokens({ color, layers, y })])
  ) as ShadowYAxisTokens;
};

/**
 * Build the shadow tokens using the given colors and layers.
 *
 * @param {ShadowColors} colors - The color for each context.
 * @param {ShadowLayers} layers - The layers to use for each elevation.
 * @returns {ShadowTokens} The shadow tokens.
 */
export const getShadowTokens = (
  colors: ShadowColors,
  layers: ShadowLayers
): ShadowTokens => {
  const colorTokens: Array<keyof ShadowTokens> = [
    'critical',
    'info',
    'inverted',
    'muted',
    'regular',
    'success',
    'warning',
  ];

  return Object.fromEntries(
    colorTokens.map((token) => [
      token,
      getShadowYAxisTokens({ color: colors[token], layers }),
    ])
  ) as ShadowTokens;
};
