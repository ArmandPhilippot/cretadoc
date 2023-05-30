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

### Usage with @cretadoc/ui components

To use a theme, you need to add an attribute `data-theme` to your application wrapper. Its value must be a theme id.

**Example with React:**

`app.tsx`

```tsx
import { Button } from '@cretadoc/ui';
import { FC } from 'react';

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
- [Vanilla-extract](https://vanilla-extract.style/) tools (like the `style` function),
- a bundler that handles CSS. See [Bundler Integration](https://vanilla-extract.style/documentation/getting-started#bundler-integration) to configure your project.

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
