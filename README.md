# ts-incremental-strict-mode

> Enable TypeScript strict mode in your project incrementally!

[![codecov](https://codecov.io/gh/RikuMantysalo/ts-incremental-strict-mode/branch/master/graph/badge.svg?token=cqjkqa8bw6)](https://codecov.io/gh/RikuMantysalo/ts-incremental-strict-mode)

Enabling TypeScript strict mode in a project where it has not been enforced
can be a painful task.

With `ts-incremental-strict-mode` you can incrementally
type check your project files with strict mode enabled, or enforce strict mode
only on specific folders.

## Installation

`ts-incremental-strict-mode` supports at least Node 8 and above.

npm

```sh
npm install ts-incremental-strict-mode --save-dev
```

yarn

```sh
yarn add ts-incremental-strict-mode --dev
```

## Usage

If you are using npm, you can replace `yarn` with `npx`.

### Basic usage

```sh
yarn ts-incremental-strict-mode <file paths>
```

```sh
yarn ts-incremental-strict-mode --help
```

### Glob patterns

`ts-incremental-strict-mode` supports same glob syntax as the include and
exclude fields in tsconfig.

Type check all files within `src` folder and it's subfolders

```sh
yarn ts-incremental-strict-mode 'src'
```

You can exclude folders with a negation pattern

```sh
yarn ts-incremental-strict-mode 'src' '!**/__tests__'
```

### Disable checks

`ts-incremental-strict-mode` supports all the strict mode options that the TypeScript compiler provides.

This mean it's possible to disable some of the checks if wanted.

```sh
yarn ts-incremental-strict-mode --strictNullChecks false --noImplicitAny false <file paths>
```

For a full list see [options](#options)

### Custom tsconfig path

By default, `ts-incremental-strict-mode` will try to resolve a config file in the path that it is ran from. If it can't find a `tsconfig.json`, it will look in a directory above until it finds it.

If you have a tsconfig with a special name or you need to specify a configuration for some other reason, you can pass the config file path via the `--config` flag.

```sh
yarn ts-incremental-strict-mode --config <path to custom tsconfig> <file paths>
```

### With lint-staged

```
"lint-staged": {
    "*{ts,tsx}": ["ts-incremental-strict-mode"]
}
```

## Options

| Option                       | Type     | Description                                                                                                                                                                                                                             |
| ---------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| noImplicitAny                | boolean  | Raise error on expressions and declarations with an implied any type. Default value `true`                                                                                                                                              |
| noImplicitThis               | boolean  | Raise error on this expressions with an implied any type. Default value `true`                                                                                                                                                          |
| alwaysStrict                 | boolean  | Parse in strict mode and emit "use strict" for each source file. Default value `true`                                                                                                                                                   |
| strictBindCallApply          | boolean  | Enable stricter checking of the bind, call, and apply methods on functions. Default value `true`                                                                                                                                        |
| strictNullChecks             | boolean  | In strict null checking mode, the null and undefined values are not in the domain of every type and are only assignable to themselves and any (the one exception being that undefined is also assignable to void). Default value `true` |
| strictFunctionTypes          | boolean  | Disable bivariant parameter checking for function types. Default value `true`                                                                                                                                                           |
| strictPropertyInitialization | boolean  | Ensure non-undefined class properties are initialized in the constructor. This option requires --strictNullChecks be enabled in order to take effect. Default value `true`                                                              |
| config                       | filepath | Path to your tsconfig file. If not specified, ts-incremental-strict-mode will try to resolve a tsconfig.json file in the directory you run ts-incremental-strict-mode. If not found it will move to the directory above until it finds a tsconfig.          |
| verbose                      | boolean  | Output the files to be type checked in to console. Useful for testing glob patterns. Default value `false`                                                                                                                              |

## Development setup

Getting started with development of `ts-incremental-strict-mode` is quite straightforward.

```sh
git clone https://github.com/rikumantysalo/ts-incremental-strict-mode.git
cd ts-incremental-strict-mode
yarn
```

To run tests (these will be ran automatically when you push to a remote!)

```sh
yarn test
```

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[wiki]: https://github.com/yourname/yourproject/wiki
