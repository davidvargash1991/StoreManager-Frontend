import * as ActionTypes from '../actionTypes';

export const items = (state = { items: [], isLoading: false, errMess: null }, action) => {
    switch(action.type){
        case ActionTypes.GET_ITEMS:
          return {...state, isLoading: false, errMess : null, items: action.payload};
        case ActionTypes.ITEMS_LOADING:
          return {...state, isLoading: true, errMess : null, items: []};
        case ActionTypes.ITEMS_FAILED:
          return {...state, isLoading: false, errMess : action.payload, items: []};          
        default:
            return state;
    }    
}