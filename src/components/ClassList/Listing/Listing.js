import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import './Listing.css';

class Listing extends Component {
  render() {
    return (
      <Panel className="listing" collapsible header={this.props.title} eventKey="1">
        <div className="listingLeft">
          <h3 className="courseTitle">{this.props.title}</h3>
          <p className="schoolTitle">{this.props.school}</p>
          <p className="startDate"> Start: November 30 </p>
          <p className="time">9:30 AM - 10:30 AM PST</p>
          <p className="daysOfWeek"> M, W </p>
        </div>
        <div className="listingRight">
          <p className="schoolStreet"> 550 NW Alder </p>
          <p className="schoolCity">Portland, Oregon 97209</p>
          <Button className="registerButton">Register</Button>
        </div>
      </Panel>
    );    
  }
}

export default Listing;