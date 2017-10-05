import React, { Component } from 'react';
import Listing from './Listing/Listing';

class ClassList extends Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function(listValue){
          return <Listing key={listValue}
                          title={listValue} />
        })}
      </ul>
    )
  }
}

export default ClassList;
