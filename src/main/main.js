import React, { Component } from 'react';
import { Switch, Route,  withRouter } from 'react-router-dom';
import { PrivateRoute } from '../Utilities/components/privateRoute';

import Home from '../home/home';
import UserList from '../users/list/userList';
import EditUser from '../users/edit/editUser';
import Login from '../login/login';

class Main extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={() => <Home />} />
        <PrivateRoute exact path="/usersAdmin" component={() => <UserList />} />
        <PrivateRoute path="/editUser/:edit/:userId?" component={({match}) => 
          <EditUser userId={match.params.userId} edit={match.params.edit} />} />
        <Route path="/login" component={() => <Login />} />
      </Switch>
    );
  }
}

export default withRouter(Main);