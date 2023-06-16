import type { Maybe, Nullable } from '@cretadoc/utils';
import { useEffect, useState } from 'react';
import type { HeadingLevel } from '../../components';
import { isBrowser } from '../../helpers';

export type HeadingsTreeNode = {
  children: HeadingsTreeNode[];
  depth: number;
  id: string;
  label: string;
};

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

type HeadingTagNames = (typeof headingTags)[number];

/**
 * Convert a node list of heading elements to a tree.
 *
 * @param {NodeListOf<HTMLHeadingElement>} headings - The heading elements list.
 * @returns {HeadingsTreeNode[]} The headings tree.
 */
const getHeadingTreeNodesFrom = (
  headings: NodeListOf<HTMLHeadingElement>
): HeadingsTreeNode[] =>
  Array.from(headings).map((heading) => {
    return {
      children: [],
      depth: headingTags.findIndex((tag) => tag === heading.localName),
      id: heading.id,
      label: heading.textContent ?? '',
    };
  });

type HeadingsTreeNodeWithParentIndex = HeadingsTreeNode & {
  parentIndex: number;
};

/**
 * Add the index of each node's parent.
 *
 * @param {HeadingsTreeNode[]} nodes - The tree nodes.
 * @returns {HeadingsTreeNodeWithParentIndex[]} A copy of the modified tree.
 */
const addParentIndexTo = (
  nodes: HeadingsTreeNode[]
): HeadingsTreeNodeWithParentIndex[] => {
  const depthLastIndexes = Array.from({ length: headingTags.length }, () => -1);

  return nodes.map((node, currentIndex) => {
    const parentDepthIndexes = depthLastIndexes.slice(0, node.depth);

    depthLastIndexes[node.depth] = currentIndex;

    return {
      ...node,
      parentIndex: Math.max(...parentDepthIndexes),
    };
  });
};

/**
 * Build an headings tree from a list of heading elements.
 *
 * @param {NodeListOf<HTMLHeadingElement>} headings - The heading elements list.
 * @returns {HeadingsTreeNode[]} The headings tree.
 */
const buildHeadingsTreeFrom = (
  headings: NodeListOf<HTMLHeadingElement>
): HeadingsTreeNode[] => {
  const treeNodes = getHeadingTreeNodesFrom(headings);
  const treeNodesWithIndex = addParentIndexTo(treeNodes);
  const rootNodes: HeadingsTreeNode[] = [];

  for (const treeNode of treeNodesWithIndex) {
    const { parentIndex, ...node } = treeNode;

    if (parentIndex >= 0) treeNodesWithIndex[parentIndex]?.children.push(node);
    else rootNodes.push(node);
  }

  return rootNodes;
};

type GetHeadingTagsListConfig = {
  /**
   * Get tags greater or equal to this level.
   */
  fromLevel: Maybe<HeadingLevel>;
  /**
   * Get tags lower or equal to this level.
   */
  toLevel: Maybe<HeadingLevel>;
};

/**
 * Retrieve a list of heading tags.
 *
 * @param {GetHeadingTagsListConfig} config - A config object.
 * @returns {HeadingTagNames[]} The heading tags list.
 */
const getHeadingTagsList = ({
  fromLevel,
  toLevel,
}: GetHeadingTagsListConfig): HeadingTagNames[] => {
  const tagsList = headingTags.slice(0);

  if (toLevel) tagsList.length = toLevel;
  if (fromLevel) tagsList.splice(0, fromLevel - 1);

  return tagsList;
};

export type UseHeadingsTreeOptions = {
  /**
   * Look for headings starting from this level (1 = `h1`, ...).
   *
   * @default undefined
   */
  fromLevel?: HeadingLevel;
  /**
   * Look for headings ending with this level (1 = `h1`, ...).
   *
   * @default undefined
   */
  toLevel?: HeadingLevel;
  /**
   * The element where to look for heading elements.
   *
   * @default undefined
   */
  wrapper?: Nullable<HTMLElement>;
};

/**
 * React hook to retrieve the headings tree in a document or in a given wrapper.
 *
 * @param {UseHeadingsTreeOptions} [options] - The headings tree options.
 * @returns {HeadingsTreeNode[]} The headings tree.
 */
export const useHeadingsTree = ({
  fromLevel,
  toLevel,
  wrapper,
}: UseHeadingsTreeOptions = {}): HeadingsTreeNode[] => {
  if (fromLevel && toLevel && fromLevel > toLevel)
    throw new Error(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );

  const [headings, setHeadings] = useState<NodeListOf<HTMLHeadingElement>>();
  const requestedTags = getHeadingTagsList({ fromLevel, toLevel });
  const headingsQuery = requestedTags.join(', ');

  useEffect(() => {
    if (!isBrowser()) return;

    const el =
      typeof wrapper === 'undefined'
        ? window.document.documentElement
        : wrapper;

    if (el) setHeadings(el.querySelectorAll(headingsQuery));
  }, [headingsQuery, wrapper]);

  return headings ? buildHeadingsTreeFrom(headings) : [];
};
