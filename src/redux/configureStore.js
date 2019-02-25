import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { users } from './reducers/usersReducer';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users : users
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}