import React, { Component } from 'react';
import { Button, Form, FormGroup, Label,
         Input, Col, FormFeedback } from 'reactstrap';
import { Loading } from '../Utilities/components/loading';
import { login } from '../services/userService';
import { withRouter } from 'react-router-dom';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: '',
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
    this.setState({
      loading: true,
      error: ''
    });
    login(this.state.username,this.state.password).then(
      user => {
        this.setState({
          loading: false
        });
        this.props.history.push('/');
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
    const errors = this.validate(this.state.username, this.state.password);
    const isFormValid = errors.username === '' && errors.password === '' &&
                        this.state.touched.username && this.state.touched.password;
    if (this.state.loading) {
      return (
        <div className="container">
          <div className="row">
            <div className="Absolute-Center is-Responsive">
              <Loading />
            </div>
          </div>
        </div>
      );
    }
    else {
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
                    <Label htmlFor="firstname">User Name</Label>
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
                    (this.state.error) &&
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

export default withRouter(Login);