# @cretadoc/read-dir

Provides a Cretadoc helper to walk through directories recursively.

## Install

```
npm install @cretadoc/read-dir
```

```
yarn add @cretadoc/read-dir
```

```
pnpm add @cretadoc/read-dir
```

## Usage

A basic usage using ESM:

```mjs
import { readDir } from '@cretadoc/read-dir';
import { fileURLToPath } from 'url';

const currentPath = fileURLToPath(import.meta.url);
const dir = await readDir(currentPath);

console.dir(dir, { depth: undefined });
```

## Options

The `readDir` function accepts a second argument to define some options.

### `depth`

Type: `number` | `undefined`  
Default: **`undefined`**

With `undefined`, the `readDir` function is recursive and will not end until there is no more path to explore.

If instead you provide a number, you can control the maximum number of recursion:

- with `0`, the `content` key will be `undefined`,
- with `1`, the `content` key will contain the files and the subdirectories in the provided path but not their children,
- with `2`, the children will be included and so on.

### `extensions`

Type: `string[] | undefined`  
Default: **`undefined`**

With `undefined`, all files will be included in `content.files`.

However if you provide an array of extensions (with a leading dot, e.g. `.md`), only the matching files will be included.

### `includeFileContents`

Type: `boolean`  
Default: **`false`**

If you want to retrieve the contents of each file, you can set this option to `true`.

### Example

```mjs
import { readDir } from '@cretadoc/read-dir';
import { fileURLToPath } from 'url';

const currentPath = fileURLToPath(import.meta.url);
const dir = await readDir(currentPath, { depth: 1, includeFileContents: true });

console.dir(dir, { depth: undefined });
```

## Output

Given `readDir('/full/path/to/dir')`, you could obtain something like:

```js
{
  content: {
    directories: [],
    files: [
      {
        content: undefined,
        createdAt: '2022-08-03T12:07:05.230Z',
        extension: '.md',
        id: 'L2Z1bGwvcGF0aC90by9kaXIvcmVhZG1lLm1k',
        name: 'readme',
        path: '/full/path/to/dir/readme.md',
        type: 'file',
        updatedAt: '2022-08-03T12:07:09.927Z',
      }
    ]
  },
  createdAt: '2022-08-03T12:07:05.230Z',
  id: 'L2Z1bGwvcGF0aC90by9kaXI=',
  name: 'dir',
  path: '/full/path/to/dir',
  type: 'directory',
  updatedAt: '2022-08-03T12:07:09.927Z',
}
```

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).

<!---
cspell:ignoreRegExp /id: '.*'/g
--->
