import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Meta } from '../../types';
import { EXCERPT_SEPARATOR } from '../constants';
import { convertMetaToStr, getMarkdownGroups, parseMarkdown } from './markdown';
import { getSlugFrom } from './strings';

describe('get-markdown-groups', () => {
  it('can retrieve contents without meta and excerpt', () => {
    const markdown = '#Some title\n\nWith contents...';
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(markdown);
    expect(groups?.excerpt).toBeUndefined();
    expect(groups?.rawMeta).toBeUndefined();
  });

  it('can retrieve excerpt without meta and contents', () => {
    const markdown = `Any excerpt${EXCERPT_SEPARATOR}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBeUndefined();
    expect(groups?.excerpt).toBe(markdown.replace(EXCERPT_SEPARATOR, ''));
    expect(groups?.rawMeta).toBeUndefined();
  });

  it('can retrieve meta without contents and excerpt', () => {
    const metaStr = 'foo: bar\nbar: bar\n';
    const markdown = `---\n${metaStr}---`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBeUndefined();
    expect(groups?.excerpt).toBeUndefined();
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve contents with meta without empty line', () => {
    const metaStr = 'foo: bar\n';
    const contents = '#Some title\n\nWith contents...';
    const markdown = `---\n${metaStr}---\n${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.excerpt).toBeUndefined();
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve contents with meta separated by an empty line', () => {
    const metaStr = 'foo: bar\n';
    const contents = '#Some title\n\nWith contents...';
    const markdown = `---\n${metaStr}---\n\n${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.excerpt).toBeUndefined();
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
    expect(groups?.excerpt).toBeUndefined();
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve excerpt with meta without empty line', () => {
    const metaStr = 'foo: bar\n';
    const excerpt = 'Any excerpt';
    const markdown = `---\n${metaStr}---\n${excerpt}${EXCERPT_SEPARATOR}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBeUndefined();
    expect(groups?.excerpt).toBe(excerpt);
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve excerpt with meta separated by an empty line', () => {
    const metaStr = 'foo: bar\n';
    const excerpt = 'Any excerpt';
    const markdown = `---\n${metaStr}---\n\n${excerpt}${EXCERPT_SEPARATOR}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBeUndefined();
    expect(groups?.excerpt).toBe(excerpt);
    expect(groups?.rawMeta).toBe(metaStr);
  });

  it('can retrieve the meta, excerpt and contents', () => {
    const metaStr = 'foo: bar\n';
    const contents = '#Some title\n\nWith contents...';
    const excerpt = 'Any excerpt';
    const markdown = `---\n${metaStr}---\n\n${excerpt}${EXCERPT_SEPARATOR}${contents}`;
    const groups = getMarkdownGroups(markdown);

    expect(groups).not.toBeUndefined();
    expect(groups?.content).toBe(contents);
    expect(groups?.excerpt).toBe(excerpt);
    expect(groups?.rawMeta).toBe(metaStr);
  });
});

type ParseMarkdownContext = {
  basePath: string;
};

describe('parse-markdown', () => {
  beforeEach<ParseMarkdownContext>((ctx) => {
    ctx.basePath = '/some/base/path';
  });

  it<ParseMarkdownContext>('can retrieve the meta and the content from a markdown string', ({
    basePath,
  }) => {
    const meta = {
      createdAt: '2023-06-22',
      seoDescription:
        'Harum molestiae eum esse eveniet pariatur et possimus. Ut ullam quo ut.',
      seoTitle: 'dolorem excepturi ea',
      status: 'draft',
      title: 'foo',
      updatedAt: '2023-06-23',
    } satisfies Meta;
    const frontMatter = `---\n${convertMetaToStr(meta)}\n---`;
    const regularContents = '# Title\n\nSome contents.\n';
    const markdown = `${frontMatter}\n\n${regularContents}`;

    expect(parseMarkdown(markdown, basePath)).toStrictEqual({
      contents: regularContents,
      excerpt: undefined,
      meta,
    });
  });

  it<ParseMarkdownContext>('return only the content when meta and excerpt are missing', ({
    basePath,
  }) => {
    const markdown = '# Title\n\nSome contents.\n';

    expect(parseMarkdown(markdown, basePath)).toStrictEqual({
      contents: markdown,
      excerpt: undefined,
      meta: undefined,
    });
  });

  it<ParseMarkdownContext>('return only the excerpt when meta and contents are missing', ({
    basePath,
  }) => {
    const markdown = `Some excerpt${EXCERPT_SEPARATOR}`;

    expect(parseMarkdown(markdown, basePath)).toStrictEqual({
      contents: '',
      excerpt: markdown.replace(EXCERPT_SEPARATOR, ''),
      meta: undefined,
    });
  });

  it<ParseMarkdownContext>('throws an error when the meta key/value pairs are unknown', ({
    basePath,
  }) => {
    const markdown = `---\nfoo: bar\n---\n\n$# Title\n\nSome contents.\n`;

    expect(() => parseMarkdown(markdown, basePath)).toThrowError();
  });

  it<ParseMarkdownContext>('throws an error if meta are invalid', ({
    basePath,
  }) => {
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

    expect(() => parseMarkdown(markdown, basePath)).toThrowError();
  });

  it<ParseMarkdownContext>('can transform the relative img paths', ({
    basePath,
  }) => {
    const absoluteUrl = 'https://anysite.com/img.jpg';
    const relativeUrl = 'img.jpg';
    const dotUrl = './relative-img.png';
    const parentUrl = '../parent-img.gif';
    const markdown = `# Heading\n\nSome text\n![](${absoluteUrl})\n\nSome other text\n\n![](${relativeUrl})\nSome text again\n\n![an alternative text](${dotUrl})\n\n![an alternative text](${parentUrl})`;
    const result = parseMarkdown(markdown, basePath);

    expect(result.contents).toContain(absoluteUrl);
    expect(result.contents).toContain(resolve(basePath, relativeUrl));
    expect(result.contents).toContain(resolve(basePath, dotUrl));
    expect(result.contents).toContain(resolve(basePath, parentUrl));
  });

  it<ParseMarkdownContext>('can transform the relative links', ({
    basePath,
  }) => {
    const absoluteUrl = 'https://anysite.com/';
    const relativeUrl = 'another-page.md';
    const dotUrl = './page.md';
    const parentUrl = '../parent-page.md';
    const markdown = `# Heading\n\nSome text with an [absolute url](${absoluteUrl})\n\nSome other text with a [relative url](${relativeUrl})\nSome text again with ![a dot url](${dotUrl})\n\n![a parent url](${parentUrl})`;
    const result = parseMarkdown(markdown, basePath);

    expect(result.contents).toContain(absoluteUrl);
    expect(result.contents).toContain(
      getSlugFrom(resolve(basePath, relativeUrl))
    );
    expect(result.contents).toContain(getSlugFrom(resolve(basePath, dotUrl)));
    expect(result.contents).toContain(
      getSlugFrom(resolve(basePath, parentUrl))
    );
  });
});
