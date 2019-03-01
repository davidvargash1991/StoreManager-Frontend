import * as ActionTypes from '../actionTypes';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { api } from '../../Utilities/constants/api';

const client = new ApolloClient({
    uri: api+"/graphql",
  });

export const fetchItems = () => (dispatch) => {
  dispatch(itemsLoading());
  client.query({
    query: ItemsQuery,
  })
  .then(data => dispatch(addItems(data.data.items)))
  .catch(error => dispatch(itemsFailed(error)));
}

export const itemsLoading = () => ({
  type: ActionTypes.ITEMS_LOADING
});

export const addItems = (items) => ({
  type : ActionTypes.GET_ITEMS,
  payload: items
});

export const itemsFailed = (errmess) => ({
  type: ActionTypes.ITEMS_FAILED,
  payload: errmess
});

export const postItem = (item) => (dispatch) => {

  client.query({
    query: gql`
      mutation {
        createItem(item: {
          name: "${item.name}",
          price: ${item.price},
          tax: ${item.tax}
        }) {
          id,
          name
        }
      }`,
  })
  .then(data => dispatch(editItem(data.data.item)))
  .catch(error => dispatch(editItemFailed(error)));   
}

export const editItemLoading = () => ({
  type: ActionTypes.EDIT_ITEM_LOADING
});

export const editItem = (item) => ({
  type : ActionTypes.EDIT_ITEM,
  payload: item
});

export const editItemFailed = (errmess) => ({
  type: ActionTypes.EDIT_ITEM_FAILED,
  payload: errmess
});

const ItemsQuery = gql`
  {
    items {
      id
      name
      price
    }
  }`;