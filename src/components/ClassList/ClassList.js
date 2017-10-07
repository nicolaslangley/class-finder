import React, { Component } from 'react';
import { ListGroup, Navbar, Nav, MenuItem, NavDropdown, Button } from 'react-bootstrap';
import './ClassList.css';
import Listing from './Listing/Listing';
import fire from '../../utils/fire';

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = { masterList: [], curList: [] };
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.downloadClassList = this.downloadClassList.bind(this);
    this.downloadClassList();
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
        }
      }
    };
    req.send();
  }

  downloadClassList() {
    var storage = fire.storage();
    // Create a reference from a Google Cloud Storage URI
    var gsReference = storage.refFromURL('gs://class-finder-541da.appspot.com/classlist.json');
    // Get the download URL
    gsReference.getDownloadURL().then(function (url) {
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onload = function (event) {
        var result = JSON.parse(xhr.response);
        this.setState({ masterList: result, curList: result });
      }.bind(this);
      xhr.open('GET', url);
      xhr.send();
    }.bind(this)).catch(function (error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log("We've encountered an error: " + error.code)
    });
  }

  applyFilters() {
    // Dummy filter for PNCA
    var output = this.state.masterList.filter(function(obj) {
      return obj.school === "Pacific Northwest College of Art (PNCA)";
    });
    this.setState({ curList: output });
  }

  resetFilters() {
    this.setState({ curList: this.state.masterList });
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
        <Button onClick={this.applyFilters}>
        Filter Classes
        </Button>
        <Button onClick={this.resetFilters}>
        Reset Filters
        </Button>
        <ListGroup>
          {this.state.curList.map(function (listValue) {
            return <Listing key={listValue.name}
              title={listValue.name}
              school={listValue.school} />
          })}
        </ListGroup>
        <Button onClick={this.updateClassList}>
        Update Class List
        </Button>
      </div>
    )
  }
}

export default ClassList;
