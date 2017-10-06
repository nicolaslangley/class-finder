import React, { Component } from 'react';
import './Masthead.css';
import { Jumbotron, Button } from 'react-bootstrap';

class Masthead extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>FIND YOUR CLASS</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Jumbotron>
    );
  }
}

export default Masthead;
