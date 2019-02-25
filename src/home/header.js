import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, 
		 Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
	
class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
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
	      </Collapse>
        </div>
      </Navbar>	
    );
  }
}
export default Header;