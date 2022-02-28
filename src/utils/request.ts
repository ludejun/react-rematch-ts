import { fetch as whatwgFetch } from 'whatwg-fetch';
import configs from '../configs';

type Fetch = typeof window.fetch;

const fetch = window.fetch || (whatwgFetch as Fetch);

function parseJSON<T>(response: Response) {
  return response.json() as Promise<Resp<T>>;
}
interface Resp<T> {
  data: T;
  errCode: string;
  errMsg?: string;
}

// 处理网络Code
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText) as Error & {
    response: Response;
  };
  error.response = response;
  throw error;
}

// 处理业务Code
function checkoutCode<T>(response: Resp<T>) {
  // const { errCode, errMsg } = response || {};
  const { errCode } = response || {};
  if (String(errCode) === configs.successCode.value) {
    return response.data;
  }
  // 其他特殊业务Code处理，如登录态过期、后端报错
  // message.error(errMsg);

  // 默认返回整个response
  return response;
  // throw response; // 这里throw就在最后统一处理
}

function catchError(error: Error) {
  console.log('catchError', error);
  // 前面的error没有处理的话，可以这里统一request请求报错处理，弹toast等

  return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} api       将要请求的url // 将要请求的API，从config/api中得到具体url
 * @param  {object} [options] The options we want to pass to "fetch"，参考https://github.github.io/fetch/
 * @return {object}           An object containing either "data" or "err"
 */
export default function request<T>(api: RequestInfo, options?: RequestInit) {
  return fetch(api, options)
    .then(checkStatus)
    .then(resp => parseJSON<T>(resp))
    .then(resp => checkoutCode(resp))
    .catch(catchError);
}
