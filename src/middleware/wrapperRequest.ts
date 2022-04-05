import { ApiOptions } from '../configs/api';

export const isPromise = (promise: unknown) => promise instanceof Promise;

interface WrapperOptions {
  fetch: typeof fetch;
  fetchOptionsProc: (...args: unknown[]) => Record<string, unknown>;
  urlProc: (url: string) => string;
  errorCallback: () => void;
}

interface Error {
  name: string;
  message: string;
  stack?: string;
}

export const wrapperRequest = ({
  fetch,
  fetchOptionsProc,
  urlProc,
  errorCallback
}: WrapperOptions) => (next: (action: unknown) => unknown) => (action: {
  type: string;
  payload: {
    apiUrl?: string; // API请求的真实URL，当有此项忽略apiName，默认没有
    params?: unknown; // 一般是Post请求的body
    apiName?: string; // urlProc函数的参数，一般通过此key在mapping表中找真实的URL
    apiOptions?: ApiOptions; //
  };
}) => {
  if (!fetch) {
    return next(action);
  }

  const { type, payload } = action;
  const { params, apiName, apiOptions, apiUrl = '' } = payload || {};
  let url: string = apiUrl;
  if (!apiUrl) {
    if (urlProc && apiName) {
      url = urlProc(apiName);
    }
  }

  // // 如果是GET请求，将params拼接在URL后
  // if (apiOptions.method === 'GET' && params && typeof params === 'object' && Object.keys(params).length > 0) {
  //   Object.keys(params).forEach((param: string) => {
  //     url = addParamsToUrl(url, param, params[param]);
  //   })
  // }
  let options = (apiOptions || {}) as ApiOptions;
  if (fetchOptionsProc && payload) {
    options = {
      ...fetchOptionsProc(params, options.headers, options.method),
      ...options
    };
  } else {
    options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: '',
      ...options
    };
  }

  if (url && options) {
    next({
      type,
      payload: {
        loading: true,
        status: 'start',
        params
      }
    });

    return fetch(url, options)
      .then(data => {
        next({
          type,
          payload: {
            data,
            loading: false,
            status: 'success',
            params
          }
        });
        return data;
      })
      .catch((error: Error) => {
        next({
          type,
          payload: {
            error,
            loading: false,
            status: 'failure',
            params
          }
        });
        errorCallback && errorCallback();
        return Promise.reject(error);
      });
  }
  return next(action);
};
