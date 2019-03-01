import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../Utilities/components/privateRoute';
import { history } from '../Utilities/history';

import Home from '../home/home';
import UserList from '../users/list/userList';
import EditUser from '../users/edit/editUser';
import ItemList from '../inventory/items/list/itemList';
import EditItem from '../inventory/items/edit/editItem';
import Login from '../login/login';

class Main extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={() => <Home />} />
          <PrivateRoute exact path="/usersAdmin" component={() => 
            <UserList />}
          />
          <PrivateRoute path="/editUser/:edit/:userId?" component={({match}) => 
            <EditUser userId={match.params.userId} edit={match.params.edit} />} 
          />
          <PrivateRoute exact path="/itemsAdmin" component={() => 
            <ItemList />}
          />       
          <PrivateRoute path="/editItem/:edit/:itemId?" component={({match}) => 
            <EditItem itemId={match.params.itemId} edit={match.params.edit} />} 
          />          
          <Route path="/login" component={() => <Login />} />
        </div>
      </Router>
    );
  }
}

export default Main;