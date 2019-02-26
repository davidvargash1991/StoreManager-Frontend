import * as ActionTypes from '../actionTypes';

export const auth = (state = { user: {}, isLoading: false, errMess: null}, action) => {
  switch(action.type){
    case ActionTypes.LOGIN_SUCCESS:
      return {...state, isLoading: false, errMess : null, user: action.payload};
    case ActionTypes.LOGING_IN:
      return {...state, isLoading: true, errMess : null, user: {}};
    case ActionTypes.LOGIN_FAILURE:
      return {...state, isLoading: false, errMess : action.payload, user: {}};          
    case ActionTypes.LOGOUT:
      return {...state, isLoading: false, errMess : null, user: {}};
    default:
      return state;
    }    
}