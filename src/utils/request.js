import { fetch } from 'whatwg-fetch';
// eslint-disable-next-line
process.env.NODE_ENV === 'dev' && require('../../mock/index');

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
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
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}
