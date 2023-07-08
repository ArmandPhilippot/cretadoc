import type { ALLOWED_STATUS } from '../utils/constants';

export type MetaStatus = (typeof ALLOWED_STATUS)[keyof typeof ALLOWED_STATUS];

export type Meta = {
  /**
   * The file or directory creation date.
   */
  createdAt?: string;
  /**
   * The meta description.
   */
  seoDescription?: string;
  /**
   * The title used by search engines.
   */
  seoTitle?: string;
  /**
   * The file or directory status.
   */
  status?: MetaStatus;
  /**
   * A readable title for the file or directory.
   */
  title?: string;
  /**
   * The file or directory update date.
   */
  updatedAt?: string;
};

export type Slug = `/${string}`;
