const configs = {
  version: '0.0.1', // 代码版本，一般会放在api请求中
  name: 'React-Rematch-TS', // 用作localstorage的namespace等命名空间
  storage: 'local', // 持久缓存放着localStorage(取值local)，还是sessionStorage（取值session）
  htmlTitle: 'React-Rematch-TS', // SPA应用html的title
  apiServer: {
    dev: '/',
    test: '/',
    st: '/',
    prod: '/',
  }, // API请求各环境的Domain配置
};

module.exports = configs;
