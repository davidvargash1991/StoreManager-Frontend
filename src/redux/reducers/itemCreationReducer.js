import * as ActionTypes from '../actionTypes';

export const itemEdit = (state = { editItem: {}, isLoading: false, errMess: null }, action) => {
    switch(action.type){
        case ActionTypes.EDIT_ITEM:
          return {...state, isLoading: false, errMess : null, editItem: action.payload};
        case ActionTypes.EDIT_ITEM_LOADING:
          return {...state, isLoading: true, errMess : null, editItem: {}};
        case ActionTypes.EDIT_ITEM_FAILED:
          return {...state, isLoading: false, errMess : action.payload, editItem: {}};          
        default:
            return state;
    }    
}