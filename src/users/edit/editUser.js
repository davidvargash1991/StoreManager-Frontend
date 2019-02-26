import React, { Component } from 'react';
import { Row, Button, Form, FormGroup, Label,
    Input, Col, FormFeedback } from 'reactstrap';
import { create, update } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import { history } from '../../Utilities/history';
import { connect } from 'react-redux';
import Header from '../../home/header';

class EditUser extends Component {
  constructor(props) {
    super(props);

    let user = {
      firstname: '',
      lastname: '',
      username: ''
    };

    if (this.props.userId !== undefined) {
      user = this.props.users.users.filter((user) => 
              user.id === parseInt(this.props.userId,10))[0];
    }
    
    this.state = {
      firstname: user !== undefined ? user.firstName : '',
      lastname: user !== undefined ? user.lastName : '',
      username: user !== undefined ? user.username : '',
      password: '',
      confirmPassword: '',
      error: '',
      touched: {
        firstname: false,
        lastname: false,
        username: false,
        password: false,
        confirmPassword: false    
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  validate(firstname, lastname, username, password, confirmPassword) {

    const errors = {
      firstname: '',
      lastname: '',        
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (this.state.touched.firstname && firstname.length < 3)
        errors.firstname = 'First Name should contain at least 3 characters';

    if (this.state.touched.lastname && lastname.length < 3)
        errors.lastname = 'Last Name should contain at least 3 characters';

    if (this.state.touched.username && username.length < 5)
        errors.username = 'user Name should contain at least 5 characters';

    if (this.state.touched.password && password.length < 8)
        errors.password = 'Last Name should contain at least 8 characters';
 
    if (this.state.touched.confirmPassword && confirmPassword !== password)
        errors.confirmPassword = 'The passwords don\'t match';
        
    return errors;
  }

  handleBack = () => {
    history.goBack();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
      error: ''
    });
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
    const user = {
      Id: this.props.userId,
      FirstName: this.state.firstname,
      lastName: this.state.lastname,
      Username: this.state.username,
      Password: this.state.password,
      Active: true,
      Locked: false
    };
    if (this.props.edit === 'true') {
      update(user).then(
        () => {
          this.props.history.goBack();
        },
        error => {
          this.setState({
            error: error.message
          });
        }        
      );
    } else {
      create(user).then(
        () => {
          this.props.history.goBack();
        },
        error => {
          this.setState({
            error: error.message
          });
        }        
      );      
    }
  }

  render() {
    const errors = this.validate(this.state.firstname, this.state.lastname, 
                                 this.state.username, this.state.password, 
                                 this.state.confirmPassword);
    const isFormValid = errors.username === '' && errors.password === '' &&
                        errors.firstname === '' && errors.firstname === '' &&
                        errors.confirmPassword === ''; 
                               
    return (
      <React.Fragment>
      <Header />        
      <div className="container">
        <Row>
          <div className="col-12">
            <h1>
              { this.props.edit === 'true' ? 'Edit User' : 'Create User' }
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
                <Label htmlFor="firstname">First Name</Label>
                <Col>
                  <Input type="text" id="firstname" name="firstname"
                         placeholder="First Name"
                         value={this.state.firstname}
                         valid={errors.firstname === ''}
                         invalid={errors.firstname !== ''}
                         onBlur={this.handleBlur('firstname')}
                         onChange={this.handleInputChange} />
                    <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastname">Last Name</Label>
                <Col>
                  <Input type="text" id="lastname" name="lastname"
                         placeholder="Last Name"
                         value={this.state.lastname}
                         valid={errors.lastname === ''}
                         invalid={errors.lastname !== ''}
                         onBlur={this.handleBlur('lastname')}
                         onChange={this.handleInputChange} />
                    <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>  
              <FormGroup>
                <Label htmlFor="username">User Name</Label>
                <Col>
                  <Input type="text" id="username" name="username"
                         placeholder="User Name"
                         value={this.state.username}
                         valid={errors.username === ''}
                         invalid={errors.username !== ''}
                         onBlur={this.handleBlur('username')}
                         onChange={this.handleInputChange} />
                  <FormFeedback>{errors.username}</FormFeedback>
                </Col>
              </FormGroup>
              {
                (this.props.userId === undefined) &&
                  <React.Fragment>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Col>
                      <Input type="password" id="password" name="password"
                             placeholder="Password"
                             value={this.state.password}
                             valid={errors.password === ''}
                             invalid={errors.password !== ''}
                             onBlur={this.handleBlur('password')}
                             onChange={this.handleInputChange} />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </Col>
                  </FormGroup> 
                  <FormGroup>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Col>
                      <Input type="password" id="confirmPassword" name="confirmPassword"
                             placeholder="Confirm Password"
                             value={this.state.confirmPassword}
                             valid={errors.confirmPassword === ''}
                             invalid={errors.confirmPassword !== ''}
                             onBlur={this.handleBlur('confirmPassword')}
                             onChange={this.handleInputChange} />
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </Col>
                  </FormGroup> 
                  </React.Fragment>                 
              }
              <FormGroup row>
                <Col md={10}>
                  <Button type="submit" color="primary" disabled={!isFormValid}>
                    <span className="fa fa-cloud fa-lg"></span> Save
                  </Button>
                  <Button type="button" color="primary" onClick={this.handleBack}>
                    <span className="fa fa-arrow-left fa-lg"></span> Go Back
                  </Button>                  
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
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps)(EditUser));