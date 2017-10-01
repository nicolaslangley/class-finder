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
    var req = new XMLHttpRequest();
    var reqListener = function () {
      console.log(this.responseText);
    };
    req.addEventListener("load", reqListener);
    var firebaseProjectID = fire.options.authDomain.split('.')[0];
    var url = 'https://us-central1-' + firebaseProjectID + '.cloudfunctions.net/auth';
    req.open('GET', url);
    req.setRequestHeader('Content-Type', 'text/plain');
    req.send();

    // Update the class list here and store in this.state
    this.setState({list: [url, "Test2", "Test3"]});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
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
