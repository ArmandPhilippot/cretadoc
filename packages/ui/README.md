# @cretadoc/ui

It provides the components and themes to build Cretadoc interfaces.

## Requirements

This package uses [Vanilla Extract](https://vanilla-extract.style/) to provides themes and components. The CSS files are not pre-compiled so you need a plugin to integrate Vanilla Extract into your bundler. Please read [Bundler integration](https://vanilla-extract.style/documentation/getting-started#bundler-integration).

## Install

```
npm install @cretadoc/ui
```

```
yarn add @cretadoc/ui
```

```
pnpm add @cretadoc/ui
```

## Components

This package provides different React components to help you build your interfaces. All you need to do is to import them and use them in your application.

**Example:**

`app.tsx`

```tsx
import { Button } from '@cretadoc/ui';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div>
      <Button>Click here</Button>
    </div>
  );
};
```

## Themes

This package provides different themes to use in Cretadoc interfaces. Each theme is represented as an object containing an id, a name, a color scheme and a collection of tokens associated to CSS values.

### Build the themes

To use the themes, first you need to build them. This package provides a function named `buildThemes` to make the process easier. All you need to do is to pass an array of themes to build in a `.css.ts` file.

`themes.css.ts`

```ts
import { buildThemes, themes } from '@cretadoc/ui';

buildThemes(themes);
```

If you don't need all the themes, you can pass a filtered array to the `buildThemes` helper. For example, if you only want `cretadoc-light` theme, you can do something like:

```ts
import { buildThemes, lightThemes } from '@cretadoc/ui';

buildThemes(lightThemes.filter((theme) => theme.id === 'cretadoc-light'));
```

### Usage with @cretadoc/ui components

To use a theme, you need to add an attribute `data-theme` to your application wrapper. Its value must be an existent theme id.

**Example with React:**

`app.tsx`

```tsx
import { Button } from '@cretadoc/ui';
import { FC } from 'react';
import './themes.css.ts';

export const App: FC = () => {
  return (
    <div data-theme="a-theme-id">
      <Button>Click here</Button>
    </div>
  );
};
```

### Usage with your own components

You can reuse the themes contract with your own components. However your application needs:

- to handle [Typescript](https://www.typescriptlang.org/),
- [Vanilla-extract](https://vanilla-extract.style/) tools (like the `style` function).

**Example with React:**

`custom-button.css.ts`

```typescript
import { contract } from '@cretadoc/ui';
import { style } from '@vanilla-extract/css';

export const button = style({
  background: contract.colors.background,
  color: contract.colors.foreground,
});
```

`custom-button.tsx`

```tsx
import { FC, ReactNode } from 'react';
import * as styles from './button.css';

type CustomButtonProps = {
  children: ReactNode;
};

export const CustomButton: FC<CustomButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
```

`app.tsx`

```tsx
import { FC } from 'react';
import { Button } from './custom-button.tsx';
import './themes.css.ts';

export const App: FC = () => {
  return (
    <div data-theme="a-theme-id">
      <Button>Click here</Button>
    </div>
  );
};
```

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).
