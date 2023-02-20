# @cretadoc/prettier-config

It provides the Prettier configuration for [Cretadoc](https://github.com/ArmandPhilippot/cretadoc#readme) packages.

## Install

With npm:

```bash
npm install --save-dev prettier @cretadoc/prettier-config
```

With Yarn:

```bash
yarn add -D prettier @cretadoc/prettier-config
```

With pnpm:

```bash
pnpm add -D prettier @cretadoc/prettier-config
```

## Usage

Create a `.prettierrc.json` file and insert:

```json
"@cretadoc/prettier-config"
```

If you need to override some rules, you should use a `.prettierrc.js` file instead:

```js
module.exports = {
  ...require('@cretadoc/prettier-config'),
  semi: false,
};
```

For more information, see the [Prettier documentation](https://prettier.io/docs/en/configuration.html#sharing-configurations).

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
