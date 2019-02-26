import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { users } from './reducers/usersReducer';
import { auth } from './reducers/authReducer';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users : users,
      auth : auth
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}