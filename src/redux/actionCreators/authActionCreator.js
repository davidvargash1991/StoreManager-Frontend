import * as ActionTypes from '../actionTypes';
import { login } from '../../services/userService';
import { history } from '../../Utilities/history';

export const loginRequest = (username,password) => (dispatch) => {
    dispatch(logingIn());
    login(username,password).then(
      user => {
        dispatch(loginSuccess(user));
        history.push('/');
      },
      error => {
        dispatch(loginFailed(error));
      }
    );
}

export const logingIn = () => ({
    type: ActionTypes.LOGING_IN
  });
  
  export const loginSuccess = (user) => ({
    type : ActionTypes.LOGIN_SUCCESS,
    payload: user
  });
  
  export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILURE,
    payload: errmess
  });