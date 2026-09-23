<h1 align="center">react-rematch-ts</h1>

<p align="center">
  面向生产的 PC 端 React 脚手架：React 19、Rematch、React Router 7、TypeScript、webpack 5 ——
  Mock、请求中间件、埋点监控都已接好。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-19-61dafb?logo=react&logoColor=white" alt="react 19" />
  <img src="https://img.shields.io/badge/typescript-5.9-3178c6?logo=typescript&logoColor=white" alt="typescript 5.9" />
  <img src="https://img.shields.io/badge/webpack-5-8dd6f9?logo=webpack&logoColor=black" alt="webpack 5" />
  <img src="https://img.shields.io/badge/rematch-2-e6484f" alt="rematch 2" />
  <img src="https://img.shields.io/badge/pnpm-10-f69220?logo=pnpm&logoColor=white" alt="pnpm 10" />
  <br />
  <a href="https://github.com/ludejun/react-rematch-ts/actions/workflows/ci.yml"><img src="https://github.com/ludejun/react-rematch-ts/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://github.com/ludejun/react-rematch-ts/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ludejun/react-rematch-ts?color=blue" alt="开源协议" /></a>
  <a href="https://github.com/ludejun/react-rematch-ts/blob/master/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PR-欢迎提交-brightgreen.svg" alt="欢迎 PR" /></a>
</p>

<p align="center">
  <a href="./CHANGELOG.md">更新日志</a>
  ·
  <a href="./CONTRIBUTING.md">贡献指南</a>
  ·
  <a href="./README.md">English</a>
</p>

---

技术栈：React · Redux · React-Router · Rematch · webpack · TypeScript · Mock.js · ESLint · Prettier · fetch

## 环境要求

Node >= 20，并使用 [pnpm](https://pnpm.io/)。

## 项目命令

```shell
pnpm install       # 安装依赖
pnpm start         # 启动开发环境，http://localhost:5591
pnpm start:size    # 启动开发环境并查看包体积分布
pnpm start:mock    # 启动开发环境，并用 Mock.js 拦截请求
pnpm build         # 生产打包，产物在 release/ 文件夹

pnpm lint          # eslint
pnpm typecheck     # tsc --noEmit
pnpm test          # vitest
pnpm format        # prettier --write
```

## 特性

1. **最新的 React**，class 和 hooks 都能自由使用；Redux 做状态管理，React Router 做路由管理。
2. **[Rematch](https://github.com/rematch/rematch)** 作为 redux 层，尽量减少模板代码，大幅提高开发效率。
3. **webpack 5** 打包，区分开发 / 测试 / 内测 / 生产环境，集成热加载。
4. **包体积分析**开发和生产都可按需开启，准确了解各包体积和组成，杜绝大依赖包进入生产（例如禁止 lodash、moment）。
5. **按缓存特性拆分静态资源** —— 不常变更的依赖固定输出为 `cached.bundle.js`，其余资源带内容 hash 并自动注入 HTML。
6. **ESLint 9（flat config）+ Prettier** 统一各项目代码格式，可自动修复。
7. **提交前强制校验** —— husky + lint-staged，格式不合规或校验不过的代码提交不上去。
8. **Mock.js** 做前端本地 API mock，开发模式下无代码侵入地代理 XMLHttpRequest 请求。
9. **TypeScript strict 模式**，在编译期就暴露更多潜在 bug。
10. **fetch** 作为 ajax 层，各环节高度配置化。
11. **丰富的示例** —— 路由、组件、同步 action、异步 action、reducer、请求处理、基础函数，可以直接参考上手。

## 目录结构

```
src/
  configs/      环境配置、API 地址与请求参数
  middleware/   包装异步 action 的请求中间件
  models/       rematch models
  pages/        路由页面与组件
  utils/        请求、缓存、埋点、通用函数
webpack/        dev.ts 和 prod.ts
mock/           Mock.js 定义
tests/          vitest 测试
```

## 参考文档

- [Rematch 实践指南](https://rematch.gitbook.io/handbook/)
- [fetch 使用](https://github.github.io/fetch/)
- [MockJS 示例](http://mockjs.com/examples.html)

## 参与贡献

见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 开源协议

[MIT](./LICENSE)
