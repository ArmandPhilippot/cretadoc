# @cretadoc/server

It provides the server used by Cretadoc.

## Install

```
npm install @cretadoc/server
```

```
yarn add @cretadoc/server
```

```
pnpm add @cretadoc/server
```

## Usage

### With CommonJS

```cjs
const cretadoc = require('@cretadoc/server');

cretadoc.createServer().then((server) => {
  server.start();
  server.stop();
});
```

### With ESM

```mjs
import { createServer } from '@cretadoc/server';

const server = await createServer();
server.start();
server.stop();
```

## Configuration

The configuration object looks like:

```ts
export type ServerConfig = {
  /**
   * A configuration object to serve an API instance.
   * @default undefined
   */
  api: APIConfig | undefined;
  /**
   * The HMR configuration when using dev mode.
   * @default undefined
   */
  hmr: HMRConfig | undefined;
  /**
   * The server hostname.
   * @default "localhost"
   */
  hostname: string;
  /**
   * The server mode.
   * @default "development"
   */
  mode: 'development' | 'production';
  /**
   * The server port.
   * @default 3000
   */
  port: number;
  /**
   * The configuration to activate server-side rendering.
   * @default undefined
   */
  ssr: SSRConfig | undefined;
  /**
   * A configuration object to serve static files.
   * @default undefined
   */
  staticDir: StaticDirConfig | undefined;
};
```

### API configuration

The Cretadoc server can be used to serve an API instance. The `api` key accepts a configuration object containing the following keys:

- `instance`: an instance of Cretadoc API (or a GraphQLYogaServer instance since we use an alias),
- `route`: the API route (default is: `/api`).

### HMR configuration

Under the hood, the server uses Vite for server-side rendering. You can change the default HMR port used by Vite. The `hmr` key accepts an object containing a `port` key which takes a number as value.

### Hostname configuration

By default, Cretadoc use `localhost` as hostname. You can use a different value if needed.

### Mode configuration

The mode is used to load different Express middleware in `production` and `development`. Default is: `development`.

### Port configuration

By default, Cretadoc uses the port `3000`. You can use a different value if needed.

### SSR configuration

The `ssr` key accepts an object as value:

- `entrypoint`: A path to the server entrypoint that exports a render function.
- `placeholders`: An object to configure the placeholders defined in the template.
- `route`: The route used for serve-side rendering (default is: `/`).
- `template`: A path to a HTML template file.

The Cretadoc server can use three different placeholders to render your contents. The `placeholders` key accepts an object with the following keys:

- `content` (mandatory): The placeholder for main content (inside `<body>`),
- `initialState` (optional): This placeholder is used to share a state between the server and the client. You need to provide an object to use it.
- `preloadedLinks` (optional): An array of URL (e.g., `/assets/your-file.css`), we can add them as `href` in different HTML `link` elements with `rel="preload"` attribute. It is useful if you want to preload some fonts or scripts for example.

### Static directory configuration

You can use the Cretadoc server to serve a static directory. The `staticDir` key accepts an object as value with the following keys:

- `entrypoint`: A HTML file used as entrypoint (default is: `index.html`). It must be inside the given path.
- `path`: The (mandatory) static directory path.
- `route`: The route used to serve the static directory (default is: `/static`).

## Examples

These examples assume that you have already imported the `@cretadoc/server` package in the file. See the `Usage` section above.

### Serve a static directory at `/public` route.

```javascript
const server = await createServer({
  mode: 'production',
  port: 8080,
  staticDir: {
    entrypoint: 'main.html',
    path: '/home/username/sites/project/static/',
    route: '/public',
  },
});
```

### Use SSR to render the files.

```javascript
const server = await createServer({
  hmr: {
    port: 24569,
  },
  mode: 'development',
  port: 6000,
  ssr: {
    entrypoint: '/home/username/sites/project/entry-server.tsx',
    placeholders: {
      content: '<!-- rendered-content -->',
    },
    template: '/home/username/sites/project/index.html',
  },
});
```

The `entry-server.tsx` file must export a function that accepts an url as parameter and that returns a string.

Example:

```tsx
import { StrictMode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './app';

export const render = (url: string) => {
  return ReactDOMServer.renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
};
```

In the `entry-server.tsx` file, you can also export two other variables: `initialState` and `preloadedLinks`.

Example:

```tsx
export const initialState = {
  foo: 'bar',
};

export const preloadedLinks = [
  '/an-important-script.js',
  '/your-stylesheet.css',
];
```

If you choose to export an initial state and/or some preloaded links, you need to modify the server configuration to add the matching placeholders:

```ts
const app = await createServer({
  ...yourPreviousConfig,
  ssr: {
    placeholders: {
      content: '<!-- rendered-content -->',
      initialState: '<!-- initial-state -->',
      preloadedLinks: '<!-- preloaded-links -->',
    },
  },
});
```

### Use the API route

```javascript
import { createAPI } from '@cretadoc/api';
import { createServer } from '@cretadoc/server';

const api = createAPI();
const app = await createServer({
  api: { instance: api, route: '/graphql' },
});
```

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
