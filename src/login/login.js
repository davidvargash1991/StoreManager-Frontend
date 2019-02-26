import React, { Component } from 'react';
import { Button, Form, FormGroup, Label,
         Input, Col, FormFeedback } from 'reactstrap';
import { Loading } from '../Utilities/components/loading';
import { withRouter } from 'react-router-dom';
import { loginRequest } from '../redux/actionCreators/authActionCreator';
import { connect } from 'react-redux';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      touched: {
        username: false,
        password: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(username, password) {

    const errors = {
      username: '',
      password: ''
    };

    if (this.state.touched.username && username.length < 5)
        errors.username = 'user Name should contain at least 5 characters';

    if (this.state.touched.password && password.length < 8)
        errors.password = 'Last Name should contain at least 8 characters';

    return errors;
  }


  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
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
    this.props.loginRequest(this.state.username,this.state.password);
  }

  render() {  
    const errors = this.validate(this.state.username, this.state.password);
    const isFormValid = errors.username === '' && errors.password === '' &&
                        this.state.touched.username && this.state.password.length >= 8;
    if (this.props.auth.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <div className="Absolute-Center is-Responsive">
              <Loading />
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <section>
          <div className="container">
            <div className="row">
              <div className="Absolute-Center is-Responsive">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <h1>Login</h1>
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
                  {
                    (this.props.auth.error) &&
                      <FormGroup>
                        <p class="text-danger">{this.state.error}</p>
                      </FormGroup>
                  }
                  <FormGroup row>
                    <Col md={{size: 10, offset: 1}}>
                      <Button type="submit" color="primary" disabled={!isFormValid}>
                        Login
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (username,password) => {dispatch(loginRequest(username,password))}
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));