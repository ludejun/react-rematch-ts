## PC端React脚手架项目

使用技术栈：
React + Redux + React-Router + Rematch + webpack + typescript + mock + eslint + prettier + fetch



#### 项目命令行

- 安装项目：`yarn install`

- 启动开发环境：`yarn start`

  Runs the app in the development mode.<br />
  Open [http://localhost:5591](http://localhost:5591) to view it in the browser.

- 启动开发环境并查看包体积分布：`yarn start:size`

- 生产打包：`yarn build`

  打包内容在release文件夹中



#### 特性

1. 最新的react框架，自由使用class或者hooks；添加最成熟的redux作为状态管理、router作为路由管理工具；
2. 使用[rematch]( https://github.com/rematch/rematch)作为redux中间件，尽量减少模版代码，极大提高开发效率；
3. 使用最新webpack作为打包，区分开发/测试/内测/生产环境；集成热加载，提高开发测试效率；
4. 开发/生产环境集成包体积命令行，准确了解各包体积大小及组成，杜绝大依赖包引入（如禁止lodash、moment引入生产）；
5. 静态资源分常变更和不常变更类型，变更资源name上添加hash，自动更新html引入；
6. 使用eslint+prettier组合规范前端代码，统一各项目代码格式，自动修改代码到规范配置；
7. 将代码规范强制绑定git commit，提交代码前自动校验并修复代码规范，不规范代码不能提交；
8. 使用mockjs作为前端本地API mock工具，自动在开发模式下，无代码侵入代理前端代码发出的XMLHttpRequest请求;
9. 集成typescript，提高前端代码质量，在编译模式发现更多可能bug；
10. 使用fetch作为ajax库，api各环节高度配置化；
11. 丰富的路由、组件、同步action、异步action、reducer、请求处理、基础函数等示例，可以直接参考上手开发。





#### 参考文档

[Rematch实践指南](https://rematch.gitbook.io/handbook/)

[fetch使用](https://github.github.io/fetch/)

[MockJS示例](http://mockjs.com/examples.html)

[YApi官网](https://yapi.baidu.com/doc/index.html) [github](https://github.com/ymfe/yapi)

