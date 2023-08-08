import { isObjKeyExist, isObject, isString } from '@cretadoc/utils';
import type { ValidationError } from '../../../types';
import { isSlug } from '../is-slug';

const validateDocLabel = (label: unknown): ValidationError[] => {
  if (isString(label)) return [];

  return [
    {
      key: 'doc',
      reason: 'label property: string expected',
      received: typeof label,
    },
  ];
};

const validateDocSlug = (slug: unknown): ValidationError[] => {
  if (isString(slug) && isSlug(slug)) return [];

  return [
    {
      key: 'doc',
      reason: 'slug property: string starting with a slash (/) expected',
      received: typeof slug,
    },
  ];
};

const validateDocConfig = (
  config: Record<PropertyKey, unknown>
): ValidationError[] => {
  if (!isObjKeyExist(config, 'label') || !isObjKeyExist(config, 'slug'))
    return [
      {
        key: 'doc',
        reason: 'label and slug properties expected',
        received: Object.keys(config).join(', '),
      },
    ];

  return [...validateDocLabel(config.label), ...validateDocSlug(config.slug)];
};

export const validateDocProp = (value: unknown): ValidationError[] => {
  if (isObject(value)) return validateDocConfig(value);

  return [
    {
      key: 'doc',
      reason: 'object expected',
      received: typeof value,
    },
  ];
};
