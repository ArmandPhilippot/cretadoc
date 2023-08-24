# @cretadoc/utils

It provides helpers for Cretadoc.

## Install

```
npm install --save-dev @cretadoc/utils
```

```
yarn add -D @cretadoc/utils
```

```
pnpm add -D @cretadoc/utils
```

## Contents

### Constants

It provides some constants that can be used across Cretadoc packages:

- `HTTP_STATUS_CODE`: a list of HTTP status codes

### Helper functions

#### Arrays

- `removeUndefined`: a type-safe method to be used as array filter to remove undefined values.

#### Objects

- `deepFreeze`: a method to recursively freeze an object,
- `getValueByKeyPath`: retrieve a value in an object using a key path (ie. `foo.bar.baz`),
- `isObjKeyExist`: check if a property key exist in the given object,
- `excludeKeysFromObj`: remove a list of keys from an object,
- `extractKeysFromObj`: extract a list of keys from an object.

#### Paths

- `isValidPath`: check if a path exists,
- `isExecutable`: check if a path exists and has execute permission,
- `isReadable`: check if a path exists and has read permission,
- `isWritable`: check if a path exists and has write permission.

#### Strings

- `camelCaseToHyphenated`: transform a camel case string to a hyphenated one,
- `camelToSnakeCase`: transform a camel case string to a snake case one,
- `slugify`: transform a string into a slug.

#### Types

A collection of helpers to check if the given value match a certain type:

- `isBoolean`,
- `isNull`,
- `isNumber`,
- `isObject`,
- `isString`,
- `isUndefined`

### Types

This package also provides generic types:

- `CommonKeysOf`: create a subtype containing only commons keys in two similar types,
- `KeyPathIn` : get an union type of key paths in the given object,
- `KeyPathValueIn`: retrieve the type of the given key path,
- `Maybe`: convert a type to be of the given type or undefined,
- `Nullable`: convert a type to be of the given type or null,
- `RemoveNeverKeys`: remove non-optional keys of type never from a type,
- `ReplaceTypesIn`: replace the type of each key in an object with the given type,
- `RequiredKeysOf`: create a new type with only the required keys in the given type,
- `UniqueKeysOf`: create a subtype containing only unique keys by comparing two types.

In addition this package exports some types from [`type-fest`](https://github.com/sindresorhus/type-fest) to avoid installing this package in addition to @cretadoc/utils. Those types are:

- `Exact`
- `LiteralUnion`: create a union type with primitive and literal types without sacrificing auto-completion,
- `PartialDeep`: create a deeply optional version of another type,
- `ReadonlyDeep`: create a deeply immutable version of another type,
- `Simplify`: flatten the type output in editors.

## License

This package is released under the [MIT license](./LICENSE).

The documentation (Markdown files) is released under a [Creative Commons license](./LICENSE-docs).

The types provided by type-fest are redistributed under the MIT license. See [`type-fest`](https://github.com/sindresorhus/type-fest) licenses.
