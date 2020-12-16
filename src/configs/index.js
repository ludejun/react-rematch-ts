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
    mock: '/',
  }, // API请求各环境的Domain配置
  mockWhiteList: [

  ], // 后端Mock Server的白名单，在白名单中可走Mock服务器，不然还是走DEV服务器
};

module.exports = configs;
