import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../../../redux/actionCreators/itemsActionCreator';
import { Loading } from '../../../Utilities/components/loading';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import Header from '../../../home/header';

const editFormatter = (cell, row, rowIndex, formatExtraData) => { 
  const rowId = row.id;
  return (     
    <Link to={`/editItem/true/${rowId}`}> 
      <span className="fa fa-edit fa-lg"></span>
    </Link> 
  ); 
}

export const itemListColumns = [{
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'price',
    text: 'Price',
    sort: true
  }, { 
    dataField: 'edit', 
    text: '', 
    editable: false, 
    align: "center", 
    headerStyle: { width: 120 }, 
    formatter: editFormatter 
  }];

class ItemList extends Component {
  componentDidMount(){
    this.props.fetchItems();
  }

  render () {
    if (this.props.items.isLoading) {
      return <Loading /> 
    } else if (this.props.items.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.items.errMess}</h4>
          </div>
        </div>      
      );
    } else {
      return (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Items</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <BootstrapTable keyField='id' data={ this.props.items.items } 
                  bootstrap4 striped
                  columns={ itemListColumns }
                  pagination={ paginationFactory()} />                  
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Link to="/editItem/false" type="button" className="btn btn-primary">
                <span className="fa fa-plus fa-lg"></span> Add
                </Link>
                <Link to="/" type="button" className="btn btn-primary">
                    <span className="fa fa-arrow-left fa-lg"></span> Go Back
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
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchItems: () => {dispatch(fetchItems())}
});

export default connect(mapStateToProps,mapDispatchToProps)(ItemList);