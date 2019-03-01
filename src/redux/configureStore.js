import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { users } from './reducers/usersReducer';
import { auth } from './reducers/authReducer';
import { items } from './reducers/itemsReducer';
import { itemEdit } from './reducers/itemCreationReducer';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      users : users,
      auth : auth,
      items : items, 
      itemEdit : itemEdit
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}