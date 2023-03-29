# @cretadoc/ui

It provides the components and themes to build Cretadoc interfaces.

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

## Themes

This package provides different themes to use in Cretadoc interfaces. Each theme is represented as an object containing an id, a name, a color scheme and a collection of tokens associated to CSS values.

The themes are not shipped as CSS files, you need to compile them in your application. To help you do that, we provide a helper function `buildThemes` but some dependencies are also required.

### Dependencies

This package uses `@vanilla-extract/css` to generate a theme contract (the shape of a theme).

[Vanilla-extract](https://vanilla-extract.style/) is a tool to write zero-runtime stylesheets in Typescript. So your application needs:

- to handle [Typescript](https://www.typescriptlang.org/),
- a bundler that handles CSS. See [Bundler Integration](https://vanilla-extract.style/documentation/getting-started#bundler-integration) to configure your project.

### Usage

#### Build all the themes

Create a `themes.css.ts` file (you can use another name) and use the helper inside it:

```typescript
import { buildThemes, themes } from '@cretadoc/ui';

buildThemes(themes);
```

Thanks to your bundler and Vanilla-extract, this file will be transformed into a CSS file containing all the global CSS variables.

#### Use a theme

To use a theme, you need to add an attribute `data-theme` to your application wrapper. Its value should be a theme id. Then you need to use Vanilla Extract tools (like the `style` function) to generate a scoped class for your component.

**Example with React:**

`button.css.ts`

```typescript
import { contract } from '@cretadoc/ui';
import { style } from '@vanilla-extract/css';

export const button = style({
  background: contract.colors.background,
  color: contract.colors.foreground,
});
```

`button.tsx`

```tsx
import { FC, ReactNode } from 'react';
import * as styles from './button.css';

type ButtonProps = {
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
```

`app.tsx`

```tsx
import { FC } from 'react';
import { Button } from './button';
import './themes.css';

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
