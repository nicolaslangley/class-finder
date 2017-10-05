import React, { Component } from 'react';
import './Listing.css';

class Listing extends Component {
  render() {
    return (
      <li className="Listing">
        <div className="Listing-Left">
          <h3 className="Listing-Title"> {this.props.title} </h3>
          <h4> Sub-header </h4>
          <div>
            <p> Start date </p>
            <p> Time / duration </p>
            <p> Days of week </p>
          </div>
        </div>
        <div className="Listing-Right">
          <a> Button </a>
        </div>
      </li>
    );    
  }

}

export default Listing;