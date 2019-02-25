import * as ActionTypes from '../actionTypes';

export const users = (state = { users: [], isLoading: false, error: null}, action) => {
    switch(action.type){
        case ActionTypes.GET_USERS:
          return {...state, isLoading: false, errMess : null, users: action.payload};
        case ActionTypes.USERS_LOADING:
          return {...state, isLoading: true, errMess : null, users: []};
        case ActionTypes.USERS_FAILED:
          return {...state, isLoading: false, errMess : action.payload, users: []};          
        default:
            return state;
    }    
}