export const isPromise = promise => typeof (promise || {}).then === 'function';

export const wrapperRequest = ({
  fetch,
  fetchOptionsProc,
  urlProc,
  errorCallback,
}) => next => action => {
  if (!fetch) {
    return next(action);
  }

  let url = action.payload && action.payload.apiName;
  if (urlProc && url) {
    url = urlProc(url);
  }
  let options = action.payload && action.payload.apiOptions;
  if (fetchOptionsProc && action.payload) {
    options = {
      ...fetchOptionsProc(action.payload.params),
      ...options,
    };
  } else {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
      ...options,
    };
  }

  if (url && options && isPromise(fetch(url, options))) {
    next({
      type: action.type,
      payload: {
        loading: true,
        status: 'start',
      },
    });

    return fetch(url, options)
      .then(data => {
        next({
          type: action.type,
          payload: {
            data,
            loading: false,
            status: 'success',
          },
        });
      })
      .catch(error => {
        next({
          type: action.type,
          payload: {
            error,
            loading: false,
            status: 'failure',
          },
        });
        errorCallback && errorCallback();
        Promise.reject(error);
      });
  }
  return next(action);
};
