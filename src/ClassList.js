import React, { Component } from 'react';

class ClassList extends Component {
  render() {
    return (
      <ul>
        {this.props.list.map(function(listValue){
          return <li key={listValue}>{listValue}</li>
        })}
      </ul>
    )
  }
}

export default ClassList;