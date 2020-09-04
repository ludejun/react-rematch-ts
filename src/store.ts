import { init } from '@rematch/core';
import * as models from './models';

interface Store {
  count?: number
}

const store = init({
    models,
});

export default store;