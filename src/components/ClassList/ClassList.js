import React, { Component } from 'react';
import { ListGroup, Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import './ClassList.css';
import Listing from './Listing/Listing';
import fire from '../../utils/fire';

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
    this.updateClassList = this.updateClassList.bind(this);
    this.updateClassList();
  }

  updateClassList() {
    var firebaseProjectID = fire.options.authDomain.split('.')[0];
    var url = 'https://us-central1-' + firebaseProjectID + '.cloudfunctions.net/findClasses';
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responsetype = 'text';
    req.onload = function(e) {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
            console.log(req.response);
            this.setState({list: JSON.parse(req.response)});
        }
      }
    }.bind(this);
    req.send();
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
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
          {this.state.list.map(function (listValue) {
            return <Listing key={listValue.name}
                            title={listValue.name}
                            school={listValue.school} />
          })}
        </ListGroup>
      </div>
    )
  }
}

export default ClassList;
