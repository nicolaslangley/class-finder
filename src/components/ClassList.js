import React, { Component } from 'react';
import Listing from './Listing/Listing';
import { ListGroup, Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

class ClassList extends Component {
  render() {
    return (
      <div>
      <Navbar>
        <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ListGroup>
        {this.props.list.map(function (listValue) {
          return <Listing key={listValue}
                          title={listValue} />
        })}
      </ListGroup>
      </div>
    )
  }
}

export default ClassList;
