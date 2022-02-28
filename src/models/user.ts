import request from '../utils/request';
import { apiURL, ajaxPostOptions } from '../configs/api';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

/*
这是正常使用rematch的model，在dispatch action时，只需要带payload，不需要再包装params、apiName
middleware不使用，可以去掉；使用中间件的参考count model，更简单点
数据流：dispatch action -> effect -> reducer -> component
*/
type User = {
  isAuth: boolean;
  isLogining: boolean;
  userInfo: Record<string, unknown>;
};
export const user = createModel<RootModel>()({
  state: {
    isAuth: false,
    isLogining: false,
    userInfo: {}
  } as User, // initial state
  reducers: {
    // handle state changes with pure functions
    loginStart(state) {
      return {
        ...state,
        isLogining: true
      };
    },
    loginSucc(state, payload: User['userInfo']) {
      return {
        ...state,
        isLogining: false,
        isAuth: true,
        userInfo: { ...payload }
      };
    },
    loginFail(state) {
      return {
        ...state,
        isLogining: false,
        isAuth: false
      };
    }
  },
  effects: dispatch => {
    const { user: userStore } = dispatch;
    return {
      async fetchLogin(
        { data, cb }: { data: Record<string, unknown>; cb: (data: any) => void },
        rootState
      ) {
        console.log(data, rootState);
        userStore.loginStart();
        try {
          const response = await request(apiURL('login'), ajaxPostOptions(data));
          if (response) {
            const res = response as { data: Record<string, unknown> };
            userStore.loginSucc(res.data);

            if (cb && typeof cb === 'function') {
              cb(res.data);
            }
          }
        } catch (e) {
          userStore.loginFail();
        }
      }
    };
  }
  // 正常写法在ts中不认识this的类型
  // effects: {
  //   async fetchLogin(
  //     { data, cb }: { data: Record<string, unknown>; cb: (data: any) => void },
  //     rootState
  //   ) {
  //     console.log(data, rootState);
  //     this.loginStart();
  //     try {
  //       const response = await request(apiURL('login'), ajaxPostOptions(data));
  //       if (response) {
  //         const res = response as { data: Record<string, unknown> };
  //         this.loginSucc(res.data);

  //         if (cb && typeof cb === 'function') {
  //           cb(res.data);
  //         }
  //       }
  //     } catch (e) {
  //       this.loginFail();
  //     }
  //   }
  // }
});
