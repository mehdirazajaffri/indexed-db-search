import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import throttle from 'lodash/throttle';

import reducers from 'store/reducers';

import { saveState, loadState } from 'utils/localStorage';
import { environments } from 'config/constants';

const middleware = [thunk];
if (process.env.NODE_ENV !== environments.PRODUCTION) {
  middleware.push(createLogger());
}

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(...middleware),
);

store.subscribe(throttle(() => {
  saveState({
    record: store.getState().record,
  });
}, 3000));

export default store;
