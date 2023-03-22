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
- `preloadedLinks` (optional): By providing an array of file paths, we can add them in different HTML `link` elements with `rel="preload"` attribute. It is useful if you want to preload some fonts or scripts for example.

### Static directory configuration

You can use the Cretadoc server to serve a static directory. The `staticDir` key accepts an object as value with the following keys:

- `entrypoint`: A HTML file used as entrypoint (default is: `index.html`). It must be inside the given path.
- `path`: The (mandatory) static directory path.
- `route`: The route used to serve the static directory (default is: `/static`).

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
