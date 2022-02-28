import { createModel } from '@rematch/core';
import { RootModel } from '.';

/*
这是使用middleware的rematch的model，在dispatch action时，需要再包装params、apiName
middleware使用；正常使用rematch不使用中间件的参考user model
数据流：dispatch action -> reducer -> component
*/
export type Count = {
  number: number;
};
export const count = createModel<RootModel>()({
  state: { number: 0 } as Count, // initial state
  reducers: {
    // handle state changes with pure functions
    incrementAsync(
      state,
      payload: {
        loading: boolean;
        status: 'success' | 'start' | 'failure';
        params: {
          num: number;
        };
      }
    ) {
      console.log(33333, state, payload);
      return {
        ...state,
        loading: payload.loading,
        ...(payload.status === 'success' ? { number: state.number + payload.params.num } : null)
      };
    },
    increment(state) {
      return {
        ...state,
        number: state.number + 1
      };
    }
  }
});
