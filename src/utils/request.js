import { fetch } from 'whatwg-fetch';
import configs from '../configs';
// eslint-disable-next-line
process.env.NODE_ENV === 'dev' && require('../../mock/index');

function parseJSON(response) {
  return response.json();
}

// 处理网络Code
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// 处理业务Code
function checkoutCode(response) {
  if (String(response[configs.successCode.key]) === configs.successCode.value) {
    return response.data;
  }
  // 其他特殊业务Code处理，如登录态过期、后端报错

  return response;
}

function catchError(error) {
  console.log('catchError', error);
  // 统一request请求报错处理，弹toast等

  return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} api       将要请求的url // 将要请求的API，从config/api中得到具体url
 * @param  {object} [options] The options we want to pass to "fetch"，参考https://github.github.io/fetch/
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(api, options) {
  return fetch(api, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkoutCode)
    .catch(catchError);
}
