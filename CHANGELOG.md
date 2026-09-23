# Changelog

## Unreleased

### Fixed

- **The production build did not run at all.** Four separate problems, each
  enough on its own:
  - `webpack-cli` was never in `devDependencies`, so `pnpm build` could not start;
  - `webpack/prod.ts` read `projectConfig.staticUrl`, which no config defined;
  - `optimization.splitChunks.name: true` is webpack 4 syntax that webpack 5
    rejects — so the build has been broken since the webpack 5 upgrade;
  - `maxSize: 0` made webpack 5 split aggressively enough that two chunks both
    claimed the fixed `cached.bundle.js` filename.
- **`react-router` was imported but never declared.** The source imports from
  `react-router` (the React Router 7 entry point) while only `react-router-dom`
  was listed; it resolved by hoisting under npm/yarn and failed under pnpm.
- **`throttle` did not throttle.** With the default `immediate = true`, it reset
  its timestamp on every call, so the guard was always satisfied and the wrapped
  function ran every time. Rewritten with leading-edge semantics matching the
  documented behaviour.
- **Fast Refresh was compiled into production builds.** `react-refresh/babel`
  was listed unconditionally in `.babelrc`; it is now dev-only.
- `tsconfig.json` set `typeRoots: ["src", …]`, which made TypeScript treat every
  folder under `src/` as an `@types` package, and carried a top-level `"types"`
  key (outside `compilerOptions`) pointing at a package that does not exist.

### Changed

- Dependencies brought up to date: webpack-cli 7, webpack-dev-server 5,
  Babel 8, TypeScript 5.9, autoprefixer 10, postcss-preset-env 11, css-loader 7,
  style-loader 4, less-loader 13, babel-loader 10, husky 9, lint-staged 17,
  Prettier 3. `@testing-library/*` moved out of `dependencies` (they were on
  v4/v9) and up to current.
- `file-loader` replaced with webpack 5's built-in asset modules.
- `.babelrc` replaced by `babel.config.js` so the dev-only plugin can be
  conditional; the decorators plugin uses Babel 8's `version: 'legacy'`.
- Type-only imports are now written as `import type`, which removes 15 webpack
  warnings about exports that do not exist at runtime.
- The project uses pnpm.

### Added

- ESLint 9 flat config (typescript-eslint, react, react-hooks, jsx-a11y, import)
  and Prettier 3, replacing ESLint 7 with the unmaintained babel-eslint. 0 errors.
- Vitest with 11 tests over the URL helpers, `num2String` and `throttle`,
  replacing a fully commented-out CRA test file.
- `README_CN.md`, `CONTRIBUTING.md` and this changelog.
- `ci.yml`: lint, typecheck, test and build on Node 20 and 22.
