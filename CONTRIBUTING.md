# Contributing · 贡献指南

English | [中文](#中文)

Thanks for taking the time to contribute. Issues and pull requests are both welcome.

## "I don't have permission to push"

You don't need it, and you shouldn't ask for it. **Nobody outside the project can push a branch to
this repository** — that is how GitHub works for every public repo, not a restriction set up here.
The way to contribute a change is to push to _your own_ fork and open a pull request from it:

```bash
# 1. Fork the repo on GitHub (the "Fork" button, top right)

# 2. Clone YOUR fork, not this one
git clone https://github.com/<your-username>/react-rematch-ts.git
cd react-rematch-ts

# 3. Point "upstream" at this repo so you can stay in sync
git remote add upstream https://github.com/ludejun/react-rematch-ts.git

# 4. Branch, commit, push to your fork
git checkout -b fix/some-bug
git commit -am "fix: describe what changed"
git push origin fix/some-bug

# 5. Open the pull request from your fork's branch against ludejun/master
```

Or do the whole thing with the [GitHub CLI](https://cli.github.com/):

```bash
gh repo fork ludejun/react-rematch-ts --clone
cd react-rematch-ts
git checkout -b fix/some-bug
# ...edit, commit...
gh pr create --repo ludejun/react-rematch-ts
```

A couple of things that can look like a permission problem but aren't:

- **The checks on your PR sit there greyed out.** For a first-time contributor, GitHub Actions waits
  for a maintainer to click "Approve and run". Nothing is wrong; it just needs a maintainer to look.
- **`git push` to `ludejun/…` returns 403.** Expected — see above. Push to your fork's remote.

## Development setup

This project uses [pnpm](https://pnpm.io/) and needs Node >= 20.

```bash
pnpm install
pnpm start       # dev server on http://localhost:5591
```

## Before you open the pull request

Please make sure all four pass — CI runs exactly these:

```bash
pnpm lint        # eslint, must report 0 errors
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest
pnpm build       # production build
```

If you changed behaviour, add or update a test in `tests/`. If you fixed a bug, a test that fails
without your fix is the most useful thing you can include.

Run `pnpm format` before committing so Prettier settles the formatting; CI does not reformat for you.

## A few conventions

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/):
  `fix:`, `feat:`, `docs:`, `chore:`, `refactor:`, `test:`.
- **Both READMEs.** If a change affects how the scaffold is used, update `README.md` _and_
  `README_CN.md`.
- **Write type-only imports as `import type`.** Babel compiles each file on its own, so a type
  imported as a value is emitted as a real import and webpack warns that the export is missing.
  ESLint enforces this and can fix it.
- **Keep dev-only Babel plugins out of production.** `react-refresh/babel` is added conditionally
  in `babel.config.js`; it used to ship in production builds.

## Reporting a bug

Open an [issue](https://github.com/ludejun/react-rematch-ts/issues) with:

- the Node version and browser,
- which command you ran,
- what you expected and what happened instead,
- ideally a minimal reproduction.

---

<a id="中文"></a>

# 中文

感谢你愿意花时间参与。Issue 和 Pull Request 都非常欢迎。

## “我没有权限提交代码”

你不需要这个权限，也不用来要。**项目之外的任何人都无法直接往本仓库推送分支** —— 这是 GitHub 对所有公开仓库的默认行为，不是本项目做了什么限制。正确的做法是推到**你自己的 fork**，再从 fork 发起 Pull Request：

```bash
# 1. 在 GitHub 页面右上角点 "Fork"

# 2. clone 你自己的 fork，不是这个仓库
git clone https://github.com/<你的用户名>/react-rematch-ts.git
cd react-rematch-ts

# 3. 把 upstream 指向本仓库，方便后续同步
git remote add upstream https://github.com/ludejun/react-rematch-ts.git

# 4. 建分支、提交、推到你自己的 fork
git checkout -b fix/some-bug
git commit -am "fix: 描述你改了什么"
git push origin fix/some-bug

# 5. 从你 fork 的这个分支，向 ludejun/master 发起 Pull Request
```

也可以用 [GitHub CLI](https://cli.github.com/) 一条龙：

```bash
gh repo fork ludejun/react-rematch-ts --clone
cd react-rematch-ts
git checkout -b fix/some-bug
# ...改代码、提交...
gh pr create --repo ludejun/react-rematch-ts
```

有两种情况看着像“没权限”，其实不是：

- **PR 上的 CI 检查一直灰着不跑。** 首次贡献者的 workflow 需要维护者点一下 “Approve and run”，这是 GitHub 的默认策略，等一下即可。
- **`git push` 到 `ludejun/…` 返回 403。** 这是预期行为，推到你自己 fork 的 remote 就好。

## 本地开发

本项目使用 [pnpm](https://pnpm.io/)，需要 Node >= 20。

```bash
pnpm install
pnpm start       # 启动开发环境，http://localhost:5591
```

## 提 PR 之前

请确认这四条全部通过 —— CI 跑的就是这四条：

```bash
pnpm lint        # eslint，必须 0 error
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest
pnpm build       # 生产打包
```

如果你改了行为，请在 `tests/` 下补充或更新测试。如果你修的是 bug，**一个不打补丁就会失败的测试**是最有价值的东西。

提交前跑一下 `pnpm format` 让 Prettier 统一格式，CI 不会替你格式化。

## 一些约定

- **提交信息**遵循 [Conventional Commits](https://www.conventionalcommits.org/)：`fix:`、`feat:`、`docs:`、`chore:`、`refactor:`、`test:`。
- **两份 README。** 如果改动影响了脚手架的用法，请同时更新 `README.md` 和 `README_CN.md`。
- **类型导入要写成 `import type`。** Babel 是逐文件编译的，把类型当值导入会真的 emit 出运行时 import，webpack 会报「导出不存在」的警告。ESLint 有规则强制并能自动修复。
- **只在开发环境生效的 Babel 插件不要打进生产。** `react-refresh/babel` 现在在 `babel.config.js` 里条件加载 —— 它之前是无条件的，会被打进生产包。

## 反馈 Bug

到 [Issues](https://github.com/ludejun/react-rematch-ts/issues) 提一条，请带上：

- Node 版本和浏览器，
- 你执行的是哪条命令，
- 你期望的行为，以及实际发生了什么，
- 最好有一个最小复现。
