export type MetaStatus = 'draft' | 'published';

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
