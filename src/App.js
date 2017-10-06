import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './images/logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Masthead from './components/Masthead/Masthead';
import ClassList from './components/ClassList/ClassList';
import Footer from './components/Footer/Footer';
import fire from './utils/fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
    this.updateClassList = this.updateClassList.bind(this);
  }

  updateClassList() {
    var firebaseProjectID = fire.options.authDomain.split('.')[0];
    var url = 'https://us-central1-' + firebaseProjectID + '.cloudfunctions.net/findClasses';
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
        <Header />
        <Masthead />
        {/* <ClassList list={this.state.list} /> */}
        <ClassList list={["Test", "Test2", "Test3"]} />
        <Button onClick={this.updateClassList}>
          Update class list
        </Button>
        <Footer />
      </div>
    );
  }
}

export default App;
