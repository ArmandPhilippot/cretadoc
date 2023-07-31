# @cretadoc/api

This package provides a GraphQL API for Cretadoc.

## Install

```
npm install @cretadoc/api
```

```
yarn add @cretadoc/api
```

```
pnpm add @cretadoc/api
```

## Usage

We use an [instance of HTTP server](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener) as example but you can integrate the API in another way (like an Express middleware) if you want.

### With CommonJS

```cjs
const createAPI = require('@cretadoc/api').createAPI;
const http = require('http');

createAPI()
  .then((api) => {
    const server = http.createServer(api);
    server.listen(4000, () => {
      console.log(`API is available at http://localhost:4000/graphql.`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
```

### With ESM

```mjs
import { createAPI } from '@cretadoc/api';
import { createServer } from 'http';

const api = await createAPI();
const server = createServer(api);
server.listen(4000, () => {
  console.log(`API is available at http://localhost:4000/graphql.`);
});
```

## Configuration

Without a configuration object, the API is not very useful. You should provide the data source(s).

The configuration object looks like:

```ts
export type APIConfig = {
  /**
   * The data configuration.
   * @default undefined
   */
  data?: {
    /**
     * The path of the documentation directory.
     * @default undefined
     */
    doc?: string;
    /**
     * The path of the pages directory.
     * @default undefined
     */
    pages?: string;
  };
  /**
   * The API endpoint.
   * @default "/graphql"
   */
  endpoint: string;
  /**
   * Enable GraphiQL.
   * @default true
   */
  graphiql: boolean;
};
```

### Data

The data object allows you to define where the API should look either for pages and/or documentation.

#### Pages

It allows you to retrieve **markdown** files without hierarchy. Typically, you can use the directory to provide contents for your homepage or a legal notice page. To use it, you need to pass **an absolute path to a directory**.

#### Doc

Unlike pages, you can organize your documentation hierarchically. You can provide an **absolute path to a directory** containing many subdirectories which themselves contain many subdirectories and **markdown** files.

### Endpoint

This key allows you to define the endpoint to access API.

### GraphiQL

This setting allows you to define if the web interface (GraphiQL) should be accessible.

## Example

```javascript
import { createAPI } from '@cretadoc/api';
import { createServer } from 'http';

const api = await createAPI({
  data: {
    doc: '/absolute/path/to/a/directory',
    pages: '/absolute/path/to/another/directory',
  },
  endpoint: '/api',
  graphiql: false,
});
const server = createServer(api);
server.listen(6000, () => {
  console.log(`API is available at http://localhost:6000/api.`);
});
```

## Usage

### Metadata

#### Pages and documentation files

Each pages and documentation files can contain metadata through front matter.

However, you can't use any key. Only the following ones are accepted:

- createdAt (if not provided, it will be set automatically)
- seoDescription
- seoTitle
- status (`draft` or `published` expected)
- title
- updatedAt (if not provided, it will be set automatically)

**Example:**

```md
---
title: My awesome page
status: published
---

This is the main content of the page.
```

**Note:** If you use an empty string (`''`) when using a mutation to update a file/directory, if the key is already set, it will be removed.

#### Documentation directories

Sometimes it can be useful to add text before listing the entries inside a directory. You can do that thanks to a special file: `index.md`.

In that file, you can add metadata using front matter, like pages and documentation files, and you can also add custom contents below.

Note:

- if you use the API to create the directory, the file will be automatically created,
- this file won't be listed in the directory's files.

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
