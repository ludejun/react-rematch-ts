import FakeRequest from '../utils/FakeRequest';

export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    },
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      console.log('rootState: ', rootState);
      await FakeRequest({ count: rootState });
      this.increment(payload);
    },
  },
};
