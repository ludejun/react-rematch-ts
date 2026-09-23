<h1 align="center">react-rematch-ts</h1>

<p align="center">
  A production-ready React scaffold for desktop web: React 19, Rematch, React Router 7,
  TypeScript and webpack 5 — with mocking, request middleware and monitoring already wired up.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-19-61dafb?logo=react&logoColor=white" alt="react 19" />
  <img src="https://img.shields.io/badge/typescript-5.9-3178c6?logo=typescript&logoColor=white" alt="typescript 5.9" />
  <img src="https://img.shields.io/badge/webpack-5-8dd6f9?logo=webpack&logoColor=black" alt="webpack 5" />
  <img src="https://img.shields.io/badge/rematch-2-e6484f" alt="rematch 2" />
  <img src="https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm&logoColor=white" alt="pnpm 10" />
  <br />
  <a href="https://github.com/ludejun/react-rematch-ts/actions/workflows/ci.yml"><img src="https://github.com/ludejun/react-rematch-ts/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://github.com/ludejun/react-rematch-ts/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ludejun/react-rematch-ts?color=blue" alt="license" /></a>
  <a href="https://github.com/ludejun/react-rematch-ts/blob/master/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">Changelog</a>
  ·
  <a href="./CONTRIBUTING.md">Contributing</a>
  ·
  <a href="./README_CN.md">中文文档</a>
</p>

---

Stack: React · Redux · React Router · Rematch · webpack · TypeScript · Mock.js · ESLint · Prettier · fetch

## Requirements

Node >= 20, and [pnpm](https://pnpm.io/).

## Commands

```shell
pnpm install       # install
pnpm start         # dev server on http://localhost:5591
pnpm start:size    # dev server, with the bundle analyzer
pnpm start:mock    # dev server, with Mock.js intercepting requests
pnpm build         # production build, output in release/

pnpm lint          # eslint
pnpm typecheck     # tsc --noEmit
pnpm test          # vitest
pnpm format        # prettier --write
```

## What it gives you

1. **Current React** — use classes or hooks freely; Redux for state and React Router for routing.
2. **[Rematch](https://github.com/rematch/rematch)** as the Redux layer, which removes most of the
   boilerplate.
3. **webpack 5**, with separate dev / test / staging / production environments and hot reloading.
4. **Bundle analysis** on demand in both dev and production, so an oversized dependency does not
   reach production unnoticed.
5. **Cache-aware asset splitting** — rarely-changing vendor code is emitted as a fixed
   `cached.bundle.js`, everything else is content-hashed and injected into the HTML automatically.
6. **ESLint 9 (flat config) + Prettier** for a single code style across projects.
7. **Pre-commit enforcement** through husky and lint-staged: unformatted or failing code cannot be
   committed.
8. **Mock.js** for local API mocking, intercepting requests in dev mode without touching the source.
9. **TypeScript in strict mode**, so more mistakes surface at compile time.
10. **fetch** as the HTTP layer, with per-environment configuration.
11. **Worked examples** of routing, components, sync and async actions, reducers, request handling
    and shared helpers — start from them rather than from an empty folder.

## Project layout

```
src/
  configs/      environment config, API URLs and request options
  middleware/   the request middleware that wraps async actions
  models/       rematch models
  pages/        routed pages and components
  utils/        request, storage, monitoring, shared helpers
webpack/        dev.ts and prod.ts
mock/           Mock.js definitions
tests/          vitest
```

## Reference

- [Rematch handbook](https://rematch.gitbook.io/handbook/)
- [fetch](https://github.github.io/fetch/)
- [Mock.js examples](http://mockjs.com/examples.html)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
