import React, { Component } from 'react';
import './Listing.css';
import { Panel, ListGroupItem } from 'react-bootstrap';

class Listing extends Component {
  render() {
    return (
      <ListGroupItem header={this.props.title}>
        Content
      </ListGroupItem>
    );    
  }
}

export default Listing;