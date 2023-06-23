import { describe, expect, it } from 'vitest';
import type { Meta } from '../../types';
import { getMarkdownGroups, parseMarkdown } from './markdown';

describe('get-markdown-groups', () => {
  it('can retrieve contents without meta', () => {
    const markdown = '#Some title\n\nWith contents...';
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(markdown);
    expect(groups?.rawMeta).toBeUndefined();
  });

  it('can retrieve meta without contents', () => {
    const metaStr = 'foo: bar\nbar: bar\n';
    const markdown = `---\n${metaStr}---`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBeUndefined();
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve contents with meta without empty line', () => {
    const metaStr = 'foo: bar\n';
    const contents = '#Some title\n\nWith contents...';
    const markdown = `---\n${metaStr}---\n${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve contents with meta separated by an empty line', () => {
    const metaStr = 'foo: bar\n';
    const contents = '#Some title\n\nWith contents...';
    const markdown = `---\n${metaStr}---\n\n${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve contents with meta when there is another YAML block', () => {
    const metaStr = 'foo: bar\n';
    const contents =
      '#Some title\n\nWith contents...\n\n```---\nbar: baz\n---```\n\nand a YAML code block';
    const markdown = `---\n${metaStr}---\n\n${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.rawMeta).toBe(metaStr);
  });
});

describe('parse-markdown', () => {
  it('can retrieve the meta and the content from a markdown string', () => {
    const meta = {
      createdAt: '2023-06-22',
      seoDescription:
        'Harum molestiae eum esse eveniet pariatur et possimus. Ut ullam quo ut.',
      seoTitle: 'dolorem excepturi ea',
      status: 'draft',
      title: 'foo',
      updatedAt: '2023-06-23',
    } satisfies Meta;
    const metaStr = Object.entries(meta)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    const frontMatter = `---\n${metaStr}\n---`;
    const regularContents = '# Title\n\nSome contents.\n';
    const markdown = `${frontMatter}\n\n${regularContents}`;

    expect(parseMarkdown(markdown)).toStrictEqual({
      content: regularContents,
      meta,
    });
  });

  it('return only the content when meta are missing', () => {
    const markdown = '# Title\n\nSome contents.\n';

    expect(parseMarkdown(markdown)).toStrictEqual({
      content: markdown,
      meta: undefined,
    });
  });

  it('throws an error when the meta key/value pairs are unknown', () => {
    const markdown = `---\nfoo: bar\n---\n\n$# Title\n\nSome contents.\n`;

    expect(() => parseMarkdown(markdown)).toThrowError();
  });

  it('throws an error if meta are invalid', () => {
    const meta = {
      createdAt: '20230622',
      seoDescription: 42,
      status: 'pending',
    };
    const metaStr = Object.entries(meta)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    const frontMatter = `---\n${metaStr}\n---`;
    const regularContents = '# Title\n\nSome contents.\n';
    const markdown = `${frontMatter}\n\n${regularContents}`;

    expect(() => parseMarkdown(markdown)).toThrowError();
  });
});
