import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import './Listing.css';

class Listing extends Component {
  render() {
    return (
      <Panel collapsible header={this.props.title} eventKey="1">
        <div className="listing">
          <div className="listingLeft">
            <p className="schoolName">{this.props.school}</p>
            <p className="schoolStreet"> 550 NW Alder </p>
            <p className="schoolCity">Portland, Oregon 97209</p>
          </div>
          <div className="listingRight">
            <p className="startDate"> Start: November 30 </p>
            <p className="daysTime">M, W 9:30 AM - 10:30 AM PST</p>
            <Button className="registerButton">Register</Button>
          </div>
        </div>
      </Panel>
    );    
  }
}

export default Listing;