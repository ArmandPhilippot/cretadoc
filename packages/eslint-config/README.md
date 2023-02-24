# @cretadoc/eslint-config

It provides ESlint configuration for Cretadoc packages.

## Introduction

This package extends the `eslint:recommended` preset. So, the rules already activated by the preset are not listed unless options differ or we need to deactivate them for some reason.

The others rules are listed in alphabetical order without regards to the section where they appear on the ["Rules reference"](https://eslint.org/docs/latest/rules/) page.

Some rules have options. These options are explicitly defined even when they match the default ones to prevent unexpected changes in `eslint:recommended`.

## Install

```
npm install --save-dev @cretadoc/eslint-config
```

```
yarn add -D @cretadoc/eslint-config
```

```
pnpm add -D @cretadoc/eslint-config
```

## Usage

Create an `.eslintrc` file with:

```json
{
  "extends": "@cretadoc/eslint-config"
}
```

Or add the config to your `package.json`:

```json
{
  "name": "your-package",
  "eslintConfig": {
    "extends": "@cretadoc/eslint-config"
  }
}
```

### With Typescript

In addition to this package, you should install some Typescript specific packages:

```
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

By default, ESlint is configured to find the nearest `tsconfig.json` file in your project. You can override this behavior and tells ESlint which config should be used by adding the following lines to your ESlint config:

```json
{
  "parserOptions": {
    "project": true,
    "tsconfigRootDir": __dirname
  }
}
```

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
