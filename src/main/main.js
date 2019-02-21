import React, { Component } from 'react';
import { Switch, Route,  withRouter } from 'react-router-dom';
import { PrivateRoute } from '../Utilities/components/privateRoute';

import Home from '../home/home';
import Login from '../login/login';

class Main extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={() => <Home />} />
        <Route path="/login" component={() => <Login />} />
      </Switch>
    );
  }
}

export default withRouter(Main);