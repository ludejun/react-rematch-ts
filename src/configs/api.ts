const configs = require('./index');

declare var process: {
  env: {
    NODE_ENV: string;
  };
};
declare global {
  interface Window {
    __MOCK: boolean
  }
};

// API对应url配置
export const apiConfig: { [key: string]: string } = {
  login: '/login', // 登陆接口
};

// 真实环境请求的url
export function apiURL(type: string) {
  if (apiConfig[type] && apiConfig[type].length > 0) {
    if (window.__MOCK && configs.mockWhiteList.indexOf(apiConfig[type]) >=0 ) {
      return `${configs.apiServer['mock']}${apiConfig[type]}`; // Mock服务器代理
    } 
    return `${configs.apiServer[process.env.NODE_ENV]}${apiConfig[type]}`;
  } else {
    throw new Error('该api匹配不到url，请检查api名称或apiConfig配置');
  }
}

// 基本的Get请求options封装
export function ajaxGetOptions() {}

// 基本的Post请求options封装
export function ajaxPostOptions(data: any, header = {}): object {
  return {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      ...header,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  };
}

// form表单请求Post的options封装
export function ajaxFormPostOptions(data: { [key: string]: any }, header = {}): object {
  const formData = new FormData();
  Object.keys(data).forEach((key: string) => formData.append(key, JSON.stringify(data[key])));
  return {
    method: 'POST',
    headers: {
      ...header,
    },
    credentials: 'include',
    body: formData,
  };
}
