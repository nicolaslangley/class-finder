import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import './Listing.css';

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