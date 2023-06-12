import type { FC } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { MarkdownField } from './markdown-field';
import { MarkdownHeading } from './markdown-heading';
import { MarkdownImage } from './markdown-image';
import { MarkdownLink } from './markdown-link';
import { MarkdownList } from './markdown-list';
import { MarkdownListItem } from './markdown-list-item';
import { MarkdownOrderedList } from './markdown-ordered-list';

export type MarkdownContentsProps = {
  /**
   * A string containing Markdown syntax.
   */
  contents: string;
};

export const MarkdownContents: FC<MarkdownContentsProps> = ({ contents }) => {
  const components: Components = {
    a: MarkdownLink,
    h1: MarkdownHeading,
    h2: MarkdownHeading,
    h3: MarkdownHeading,
    h4: MarkdownHeading,
    h5: MarkdownHeading,
    h6: MarkdownHeading,
    img: MarkdownImage,
    input: MarkdownField,
    li: MarkdownListItem,
    ol: MarkdownOrderedList,
    ul: MarkdownList,
  };

  return <ReactMarkdown components={components}>{contents}</ReactMarkdown>;
};
