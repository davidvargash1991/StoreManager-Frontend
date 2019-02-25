import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { getAll } from '../../services/userService';
import { Link } from 'react-router-dom';
import Header from '../../home/header';

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
  constructor(props) {
    super(props);    
    this.state = {
      users: [],
    };
  } 

  componentDidMount(){
    getAll().then(
      users => {
        this.setState({
            users
          });
      },
      error => {
        this.setState({
          loading: false,
          error: error.message
        });
      }
    );
  }

  render() {
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
              <BootstrapTable keyField='id' data={ this.state.users } 
                bootstrap4 striped
                columns={ userListColumns } />                  
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
export default UserList;