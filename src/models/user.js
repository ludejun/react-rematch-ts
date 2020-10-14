import request from '../utils/request';
import { apiURL, ajaxPostOptions } from '../configs/api.ts';

export const user = {
  state: {
    isAuth: false,
    isLogining: false,
    userInfo: {},
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    loginStart(state) {
      return {
        ...state,
        isLogining: true,
      };
    },
    loginSucc(state, payload) {
      return {
        ...state,
        isLogining: false,
        isAuth: true,
        userInfo: { ...payload },
      };
    },
    loginFail(state) {
      return {
        ...state,
        isLogining: false,
        isAuth: false,
      };
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async fetchLogin({ data, cb }, rootState) {
      console.log(data, rootState);
      this.loginStart();
      try {
        const response = await request(apiURL('login'), ajaxPostOptions(data));
        this.loginSucc(response.data.data);
        if (cb && typeof cb === 'function') {
          cb(response.data.data);
        }
      } catch (e) {
        this.loginFail();
      }
    },
  },
};
