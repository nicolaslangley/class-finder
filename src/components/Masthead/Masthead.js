import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './Masthead.css';

class Masthead extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>Education is your best investment</h1>
        <p>Get started today!</p>
        <p><Button bsStyle="primary" className="registerButton">Sign-Up</Button></p>
      </Jumbotron>
    );
  }
}

export default Masthead;
