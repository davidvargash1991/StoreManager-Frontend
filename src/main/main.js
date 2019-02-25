import React, { Component } from 'react';
import { Switch, Route,  withRouter } from 'react-router-dom';
import { PrivateRoute } from '../Utilities/components/privateRoute';
import { connect } from 'react-redux';

import { fetchUsers } from '../redux/actionCreators/usersActionCreator';

import Home from '../home/home';
import UserList from '../users/list/userList';
import EditUser from '../users/edit/editUser';
import Login from '../login/login';

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => {dispatch(fetchUsers())}
});

class Main extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }

  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={() => <Home />} />
        <PrivateRoute exact path="/usersAdmin" component={() => <UserList users={this.props.users} />} />
        <PrivateRoute path="/editUser/:edit/:userId?" component={({match}) => 
          <EditUser users={this.props.users} userId={match.params.userId} edit={match.params.edit} />} />
        <Route path="/login" component={() => <Login />} />
      </Switch>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));