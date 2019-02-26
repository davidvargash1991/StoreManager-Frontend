import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, 
     Collapse, NavItem, Dropdown, DropdownToggle,
     DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isNavOpen: false,
      isDropdownOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
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
                    <DropdownItem><a href="/user/preferences"><i className="icon-cog"></i> Reset Password</a></DropdownItem>
                    <DropdownItem><a href="/auth/logout"><i className="icon-off"></i> Logout</a></DropdownItem>
                  </DropdownMenu>                                 
                </Dropdown>
              </Nav>              
	        </Collapse>
        </div>
      </Navbar>	
    );
  }
}
export default connect(mapStateToProps)(Header);