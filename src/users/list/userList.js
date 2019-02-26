import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link } from 'react-router-dom';
import Header from '../../home/header';
import { Loading } from '../../Utilities/components/loading';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actionCreators/usersActionCreator';
import paginationFactory from 'react-bootstrap-table2-paginator';

const editFormatter = (cell, row, rowIndex, formatExtraData) => { 
  const rowId = row.id;
  return (     
    <Link to={`/editUser/true/${rowId}`}> 
      <span className="fa fa-edit fa-lg"></span>
    </Link> 
  ); 
}

export const userListColumns = [{
    dataField: 'username',
    text: 'User name',
    sort: true
  }, {
    dataField: 'firstName',
    text: 'First Name',
    sort: true
  }, {
    dataField: 'lastName',
    text: 'Last Name',
    sort: true
  },{
    dataField: 'active',
    text: 'Active'
  },{
    dataField: 'locked',
    text: 'Locked'
  },{ 
    dataField: 'edit', 
    text: '', 
    editable: false, 
    align: "center", 
    headerStyle: { width: 120 }, 
    formatter: editFormatter 
  }];

class UserList extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }
    
  render() {
    if (this.props.users.isLoading) {
      return <Loading /> 
    } else if (this.props.users.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.users.errMess}</h4>
          </div>
        </div>      
      );
    } else {
      return(  
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Users</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <BootstrapTable keyField='id' data={ this.props.users.users } 
                  bootstrap4 striped
                  columns={ userListColumns }
                  pagination={ paginationFactory()} />                  
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link to="/editUser/false" type="button" className="btn btn-primary">
                <span className="fa fa-plus fa-lg"></span> Add
                </Link>
              </div>        
            </div>
          </div>  
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => {dispatch(fetchUsers())}
});

export default connect(mapStateToProps,mapDispatchToProps)(UserList);