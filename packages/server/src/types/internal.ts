import type { ServerRender } from '.';

export type LinkAsValue =
  | 'audio'
  | 'document'
  | 'embed'
  | 'fetch'
  | 'font'
  | 'image'
  | 'object'
  | 'script'
  | 'style'
  | 'track'
  | 'video'
  | 'worker';

export type LinkRelValue = 'preload';

export type LinkAttributeKey =
  | 'as'
  | 'blocking'
  | 'crossorigin'
  | 'href'
  | 'hreflang'
  | 'imagesizes'
  | 'imagesrcset'
  | 'integrity'
  | 'media'
  | 'prefetch'
  | 'referrerpolicy'
  | 'rel'
  | 'title'
  | 'type';

export type LinkAsAttribute = {
  as: LinkAsValue;
};

export type LinkRelAttribute = {
  rel: LinkRelValue;
};

export type LinkOtherAttributes = {
  [k in LinkAttributeKey]?: string;
};

export type LinkAttributes = LinkAsAttribute &
  LinkRelAttribute &
  LinkOtherAttributes;

export type RenderImport = {
  render: ServerRender;
};
