import { init, RematchRootState } from '@rematch/core';
import { apiConfig, ajaxPostOptions, ajaxGetOptions } from './configs/api';
import { wrapperRequest } from './middleware/wrapperRequest';
import * as models from './models';
import request from './utils/request';

const promiseMiddlewareConfig = {
  fetch: request,
  urlProc: apiName => apiConfig[apiName],
  fetchOptionsProc: (data, header = {}, method = 'POST') =>
    method === 'POST' ? ajaxPostOptions(data, header) : ajaxGetOptions(data, header),
  errorCallback: () => console.log('攻城狮开小差了，请稍后重试～'),
};

const store = init({
  models,
  redux: {
    middlewares: [wrapperRequest.bind(null, promiseMiddlewareConfig)],
  },
});

export default store;

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;
