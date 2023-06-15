import type { Maybe, Nullable } from '@cretadoc/utils';
import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
} from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import { MarkdownField } from './markdown-field';
import { MarkdownHeading } from './markdown-heading';
import { MarkdownImage } from './markdown-image';
import { MarkdownLink } from './markdown-link';
import { MarkdownList } from './markdown-list';
import { MarkdownListItem } from './markdown-list-item';
import { MarkdownOrderedList } from './markdown-ordered-list';

export type MarkdownContentsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * A string containing Markdown syntax.
   */
  contents: Maybe<Nullable<string>>;
};

const MarkdownContentsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  MarkdownContentsProps
> = ({ contents, ...props }, ref) => {
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

  return (
    <div {...props} ref={ref}>
      <ReactMarkdown components={components} rehypePlugins={[rehypeSlug]}>
        {contents ?? ''}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownContents = forwardRef(MarkdownContentsWithRef);
