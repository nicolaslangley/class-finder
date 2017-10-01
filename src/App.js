import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ClassList from './ClassList.js';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
    this.updateClassList = this.updateClassList.bind(this);
  }

  updateClassList() {
    var firebaseProjectID = fire.options.authDomain.split('.')[0];
    var url = 'https://cors.io/?https://us-central1-' + firebaseProjectID + '.cloudfunctions.net/findClasses';
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responsetype = 'text';
    req.onload = function(e) {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
            console.log(req.response);
            this.setState({list: JSON.parse(req.response)});
        }
      }
    }.bind(this);
    req.send();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Class Finder</h1>
        </header>
        <ClassList list={this.state.list}/>
        <button onClick={this.updateClassList}>
        Update class list
        </button>

      </div>
    );
  }
}

export default App;
