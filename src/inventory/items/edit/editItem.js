import React, { Component } from 'react';
import { Row, Button, Form, FormGroup, Label,
    Input, Col, FormFeedback } from 'reactstrap';
//import { history } from '../../Utilities/history';
import NumericInput from 'react-numeric-input';
import Header from '../../../home/header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postItem } from '../../../redux/actionCreators/itemsActionCreator';

class EditItem extends Component {
  constructor(props) {
    super(props);
        
    this.state = {
      name: '',
      price: 0,
      tax: 0,
      error: '',
      touched: {
        name: false,
        price: false,
        tax: false
      }
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(name, price, tax) {

    const errors = {
      name: '',
      price: '',        
      tax: ''
    };

    if (this.state.touched.name && (name.length < 2 || name.length > 100))
        errors.name = 'Name should be between 2 and 100 characters';
        
    if (this.state.touched.price && (price === "" || price === "0.00"))
        errors.price = 'Price should be grater than 0';

    if (this.state.touched.tax && (tax === "" || tax === "0.00"))
        errors.tax = 'Price should be grater than 0';

    return errors;
  }

  handleBlur = (field) => (evt) => {
    if (field === 'price' || field === 'tax') {
      const name = field;
      this.setState({
        touched: { ...this.state.touched, [field]: true },
        error: '',
        [name]: evt.target.value
      });      
    } else {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
        error: ''
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const item = {
      name: this.state.name,
      price: this.state.price,
      tax: this.state.tax
    };    
    this.props.postItem(item);
  }  

  render() {
    const errors = this.validate(this.state.name, this.state.price, 
                                 this.state.tax);
    const isFormValid = errors.name === '' && errors.tax === '' && 
                        errors.price === '';     
    
    return(
      <React.Fragment>
        <Header />        
        <div className="container">
          <Row>
            <div className="col-12">
              <h1>
                { this.props.edit === 'true' ? 'Edit Item' : 'Create Item' }
              </h1>
            </div>
          </Row>
          <Row>
            <div className="col-12 col-md-9">
              <Form onSubmit={this.handleSubmit}>
                {
                  (this.state.error) &&
                    <FormGroup>
                      <p class="text-danger">{this.state.error}</p>
                    </FormGroup>
                }            
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Col>
                    <Input type="text" id="name" name="name"
                           placeholder="Name"
                           value={this.state.name}
                           valid={errors.name === ''}
                           invalid={errors.name !== ''}
                           onBlur={this.handleBlur('name')}
                           onChange={this.handleInputChange} />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="price">Price</Label>
                  <Col>
                    <NumericInput id="price" name="price"
                         placeholder="Price" className="form-control"
                         step={0.01}
                         precision={2}
                         value={0}
                         valid={errors.price === ''}
                         invalid={errors.price !== ''}                         
                         onBlur={this.handleBlur('price')} />
                         <FormFeedback>{errors.price}</FormFeedback>
                  </Col>
                </FormGroup>  
                <FormGroup>
                  <Label htmlFor="tax">Tax</Label>
                  <Col>
                  <NumericInput id="tax" name="tax"
                         placeholder="Tax" className="form-control"
                         step={0.01}
                         precision={2}
                         value={0}
                         onBlur={this.handleBlur('tax')} />                  
                    <FormFeedback>{errors.tax}</FormFeedback>
                  </Col>
                </FormGroup>                 
              <FormGroup row>
                <Col md={10}>
                  <Button type="submit" color="primary" disabled={!isFormValid}>
                    <span className="fa fa-cloud fa-lg"></span> Save
                  </Button>
                  <Link to="/itemsAdmin" type="button" className="btn btn-primary">
                    <span className="fa fa-arrow-left fa-lg"></span> Go Back
                  </Link>                          
                </Col>
              </FormGroup>                                                    
            </Form>
          </div>  
        </Row>      
      </div>
      </React.Fragment>      
    );
  }
}

const mapStateToProps = state => {
  return {
    itemEdit: state.itemEdit
  }
}

const mapDispatchToProps = (dispatch) => ({
  postItem: (item) => {dispatch(postItem(item))}
});

export default connect(mapStateToProps,mapDispatchToProps)(EditItem);