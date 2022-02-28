import configs, { Env } from '.';

// API对应url配置
export const apiConfig: Record<string, string> = {
  count: '/count', // 示例接口，配合rematch及中间件演示
  login: '/login' // 登陆接口
};

// 真实环境请求的url
export function apiURL(type: string) {
  if (apiConfig[type] && apiConfig[type].length > 0) {
    if (configs.mockWhiteList.indexOf(apiConfig[type]) >= 0) {
      return `${configs.apiServer['mock']}${apiConfig[type]}`; // Mock服务器代理
    }
    return `${configs.apiServer[process.env.NODE_ENV as Env]}${apiConfig[type]}`;
  } else {
    throw new Error('该api匹配不到url，请检查api名称或apiConfig配置');
  }
}

export interface ApiOptions {
  method: 'GET' | 'POST';
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  body?: string | FormData;
}
// 基本的Get请求options封装
export function ajaxGetOptions(header: Record<string, string> = {}): ApiOptions {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...header
    }
  };
}

// 基本的Post请求options封装
export function ajaxPostOptions(data: any, header = {}): ApiOptions {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...header
    },
    credentials: 'include',
    body: JSON.stringify(data)
  };
}

// form表单请求Post的options封装
export function ajaxFormPostOptions(data: { [key: string]: any }, header = {}): ApiOptions {
  const formData = new FormData();
  Object.keys(data).forEach((key: string) => formData.append(key, JSON.stringify(data[key])));
  return {
    method: 'POST',
    headers: {
      ...header
    },
    credentials: 'include',
    body: formData
  };
}
