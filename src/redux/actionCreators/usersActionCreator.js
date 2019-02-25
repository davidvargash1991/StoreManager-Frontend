import * as ActionTypes from '../actionTypes';
import { getAll } from '../../services/userService';

export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading());
  getAll().then(
    users => {
      dispatch(addUsers(users));
    },
    error => {
      dispatch(usersFailed(error));
    }
  );
}

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const addUsers = (users) => ({
  type : ActionTypes.GET_USERS,
  payload: users
});

export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess
});