// import FakeRequest from '../utils/FakeRequest';

export const count = {
  state: { number: 0 }, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      console.log(33333, state, payload);
      return {
        ...state,
        loading: payload.loading,
        ...(payload.status === 'success' ? { number: state.number + payload.num } : null),
      };
    },
  },
};
