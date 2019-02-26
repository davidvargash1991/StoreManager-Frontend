import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, 
     Collapse, NavItem, Dropdown, DropdownToggle,
     DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRequest } from '../redux/actionCreators/authActionCreator';

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => {dispatch(logoutRequest())}
});

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isNavOpen: false,
      isDropdownOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleDropdown() {
    this.setState(prevState => ({
      isDropdownOpen: !prevState.isDropdownOpen
    }));
  }

  logout(event) {
    this.props.logoutRequest();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <Navbar dark color="primary" expand="md">
	      <div className="container">
	        <NavbarToggler onClick={this.toggleNav} />
	        <NavbarBrand className="mr-auto" href="/">
            <span className="fa fa-archive fa-lg"></span> Store Manager
          </NavbarBrand>
	        <Collapse isOpen={this.state.isNavOpen} navbar>
	          <Nav navbar>
	            <NavItem>
	              <NavLink className="nav-link"  to='/'>
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
	            </NavItem>					
            </Nav>
              <Nav className="pull-right">
                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle caret>
                    {user.username}
                  </DropdownToggle> 
                  <DropdownMenu>
                    <DropdownItem>
                      <span className="fa fa-refresh fa-lg"></span> Reset Password
                    </DropdownItem>
                    <DropdownItem onClick={this.logout}>
                      <span className="fa fa-sign-out fa-lg"></span> Logout
                    </DropdownItem>
                  </DropdownMenu>                                 
                </Dropdown>
              </Nav>              
	        </Collapse>
        </div>
      </Navbar>	
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);