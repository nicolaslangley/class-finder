import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Class Finder</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>Link</NavItem>
            <NavItem eventKey={2}>Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Header;